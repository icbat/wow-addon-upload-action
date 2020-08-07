
const fs = require('fs')
const core = require('@actions/core')
const got = require('got')
const FormData = require('form-data')

// Wrap in async function to allow awaiting
async function main() {
    const id = core.getInput('id', { required: true })
    const version = core.getInput('version', { required: true })
    const compatible = core.getInput('compatible', { required: true })
    const zipFilePath = core.getInput('zipFilePath', { required: true })
    const apiKey = process.env.WOW_INTERFACE || core.getInput('apiKey', { required: true })

    core.debug('Validating inputs')
    const versions = await got.get('https://api.wowinterface.com/addons/compatible.json', {
        headers: {
            'x-api-token': apiKey
        }
    }).json()

    // Of the "80307" format
    const comaptibleVersionStrings = versions.map(vObj => vObj.interface)

    const userInputVersions = compatible.split(',')
    for (const vers of userInputVersions) {
        if (!comaptibleVersionStrings.includes(vers)) {
            return core.setFailed(`Argument 'compatible' contains an invalid value:  ${vers}. Please visit https://api.wowinterface.com/addons/compatible.json to see possible values`)
        }
    }

    core.debug('Building the FormData payload')
    // To see what all you can send, visit https://api.wowinterface.com/addons/update
    const body = new FormData()
    body.append('id', id)
    body.append('updatefile', fs.createReadStream(zipFilePath))
    body.append('compatible', compatible)
    body.append('version', version)

    core.info('Uploading/Updating addon')
    const result = await got.post('https://api.wowinterface.com/addons/update', {
        body,
        headers: {
            'x-api-token': apiKey
        }
    })

    core.debug(result.body)
    core.info("Successfully updated addon!")
}

main().catch(core.setFailed)