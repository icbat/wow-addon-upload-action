# wow-addon-upload-action
A GitHub Action upload your a .zip of your WoW Addon to WoW Interface

## Inputs

| Name | Required | Description | Example |
|:--|:-:|:--|:--|
| id | yes | The ID of your project on WoW Interface. Found in your addon's url: `https://www.wowinterface.com/downloads/info<THE ID>-MyCoolAddon.html` | `12345` |
| version | yes | Your version for your addon. Should increment with every new upload. | `2.0.1` or even `2` |
| compatible | yes | A comma delimited list of WoW versions that your addon will work on. Reference the `interface` field from [this list of compatible versions](https://api.wowinterface.com/addons/compatible.json) | `80000,80307,80300` |
| zipFilePath | yes | The path to the zip file of your bundled up addon | `./build/MyCoolAddon.zip` |
| apiKey | yes | Your personal, super-secret API key from WoW Interface. If you're logged in, you can [generate or find one](https://www.wowinterface.com/downloads/filecpl.php?action=apitokens). Can be overridden by setting the Environment variable WOW_INTERFACE; if you do, this input is not required. | `supersecrethashthatgoesonforawhilefromwowi` |
