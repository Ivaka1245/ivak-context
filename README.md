# Ivak-Context
How to use:
```lua
exports["ivak-context"]:ShowMenu({
    {
        header = "Test Header",
        isMenuHeader = true
    },

    {
        header = "Make money",
        params = {
            event = "your:event" -- or action = function() local ped = PlayerPedId end
        }
    },

    {
        header = "Close",
        params = {}
    }
})
```

## Preview:
![img](https://cdn.discordapp.com/attachments/919158811787395112/1035974573960724570/Screenshot_37.png)

## Info:
- This is a pre-worked version of [qb-menu](https://github.com/qbcore-framework/qb-menu)

## Discord: https://discord.gg/AS6PP9pjpt