const fs = require('fs')

const core = require('@actions/core')
const got = require('got')


// const zipFilePath = core.getInput('zipFile', { required: true })
const apiKey = process.env.WOW_INTERFACE || core.getInput('WOW_INTERFACE', { required: true })

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
    const form = {
        "id": 25623,
        "description": `This addon constantly checks the LFG panel for potential bonus loot for the roles you've specified.

It needs an LDB display addon to function. I recommend either ChocolateBar.

The broker data display shows how many Random Dungeons are offering a bonus reward for your role right now, as well as how many Looking For Raid instances offer a bonus reward for your role right now.

Feedback? Leave an [URL="https://github.com/icbat/broker-call-to-arms"]Issue on Github[/URL]`,
    }

    core.info('Updating addon')
    const result = await got.post('https://api.wowinterface.com/addons/update', {
        form,
        headers: {
            'x-api-token': apiKey
        }
    })

    core.debug(result.body)
    core.info("Successfully updated addon!")
}

main().catch(core.setFailed)