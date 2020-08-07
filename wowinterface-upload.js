
const fs = require('fs')
const core = require('@actions/core')
const got = require('got')
const FormData = require('form-data')


// Example payload from the failed request
// const payload = {
//     "id": {
//         "Type": "INT",
//         "Required": "Yes",
//         "Description": "ID number of your AddOn you wish to update."
//     },
//     "title": {
//         "Type": "STR",
//         "Required": "No",
//         "Description": "Title or name of your AddOn."
//     },
//     "version": {
//         "Type": "STR",
//         "Required": "No",
//         "Description": "Version number of your Retail AddOn. *Must change this number if new file is included."
//     },
//     "description": {
//         "Type": "STR",
//         "Required": "No",
//         "Description": "Full description of your AddOn."
//     },
//     "changelog": {
//         "Type": "STR",
//         "Required": "No",
//         "Description": "Full changelog of your AddOn."
//     },
//     "archive": {
//         "Type": "STR",
//         "Required": "No",
//         "Description": "Default\/Blank = Archive previous, Yes = Archive previous, No = Do not archive previous"
//     },
//     "compatible": {
//         "Type": "STR",
//         "Required": "No",
//         "Description": "Comma delimited list of all patch numbers your AddOn is compatiable with. If you provide the classic version number it will tag your upload for classic.",
//         "list": "https:\/\/api.wowinterface.com\/addons\/compatible.json"
//     },
//     "updatefile": {
//         "Type": "FILE",
//         "Required": "No",
//         "Description": "AddOn Zip or Rar file for retail."
//     },
// }

// Wrap in async function to allow awaiting
async function main() {
    core.debug('Validating inputs')
    // const zipFilePath = core.getInput('zipFile', { required: true })
    const apiKey = process.env.WOW_INTERFACE || core.getInput('WOW_INTERFACE', { required: true })
    
    const versions = await got.get('https://api.wowinterface.com/addons/compatible.json', {
        headers: {
            'x-api-token': apiKey
        }
    }).json()

    // TODO check for version in the list of compatible versions
    // split the CDL, check each one is in the list
    // if one is wrong, give them the URL to go look at what's available.

    console.log(JSON.stringify(versions, null, 4))

    core.debug('Building the FormData payload')
    const body = new FormData()
    body.append('id', 25623)

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