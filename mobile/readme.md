# Tooling Updates and How to Update

## Dev Tools

### Cordova CLI: 5.4.1 (last update 11/27)
Update with `npm install -g cordova`
### Cordova Windows Platform: 4.2.0 (Last update 11/11)
Install with `cordova platform add windows@4.2.0` in `mobile/build/dest/`
Update with `cordova platform update windows@4.2.0` in `mobile/build/dest/`
### Cordova Android Platform: 5.0.0
Install with `cordova platform add android@5.0.0` in `mobile/build/dest/`
Update with `cordova platform update android@5.0.0` in `mobile/build/dest/`
### Cordova iOS Platform: 3.9.2

## Aurelia: Last update 11/16 @ 17:25
Update with `jspm install` in `mobile/`

## Other tools:
CoreJS was updated while figuring out the Firefox WebIDE debugging issues.
Run `jspm update` in `mobile/` to update.
(11/14)

# Dependencies

## Cordova Plugins (last changed 11/27)
### ALL plugins updated on 11/27
To update a plugin, remove it with `cordova plugin rm ` + &lt;PLUGIN NAME&gt; and then reinstall it.

_(Assume these start with `cordova-plugin-`)_
* whitelist
* console
* device (added 11/15)
* dialogs (added 11/21)
* camera (added 11/22)

## npm dependencies
None added since this document was written

## jspm dependencies
_(Run these with `jspm install`+DependencyName)_
* aurelia-animator-velocity (added 11/24)
