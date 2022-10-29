local headerShown = false
local sendData = nil

RegisterNUICallback("clickedButton", function(option, cb)
    if headerShown then headerShown = false end
    SetNuiFocus(false, false)

    PlaySoundFrontend(-1, "Highlight_Cancel", "DLC_HEIST_PLANNING_BOARD_SOUNDS", 1)

    if sendData then
        local data = sendData[tonumber(option)]
        sendData = nil

        if data then
            if data.params.event then
                TriggerEvent(data.params.event, data.params.args)
            elseif data.params.action then
                data.params.action()
            end
        end
    end

    cb("ok")
end)

RegisterNUICallback("closeMenu", function(_, cb)
    headerShown = false
    sendData = nil
    SetNuiFocus(false, false)

    cb("ok")
end)

function showMenu(data)
    if not data then return end

    headerShown = false
    sendData = data

    SetNuiFocus(true, true)
    SendNUIMessage({action = "show_menu", data = {table.unpack(data)}})
end

function hideMenu()
    sendData = nil
    headerShown = false

    SetNuiFocus(false, false)
    SendNUIMessage({action = "hide_menu"})
end

RegisterNetEvent("ivak-context:hide", function()
    hideMenu()
end)

exports("ShowMenu", showMenu)
exports("HideMenu", hideMenu)