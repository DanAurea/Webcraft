var resources = ["img/apple.png"];

/*
 * Download all game assets required by the game in order to lauch
 * /!\ In case of an error, readyCallback will not be called
 * Params :
 *  readyCallback  : Callback(duration(ms)) used if all resources loaded successfully
 *  updateCallback : Callback(amountDownloaded, totalAmountToDownload) used on one file finished downloading
 *  errorCallback  : Callback(error) used if an error happen during download,
 */
function downloadGameResources(readyCallback, updateCallback, errorCallback)
{
    var resourceDownloaded = 0;
    var resourceAmount = resources.length;
    var beginTime = new Date().getTime();

    for(var i = 0; i < resourceAmount; i++)
    {
        var url = resources[i];
        $.get(url, function()
        {
            //Download finished
            updateCallback(++resourceDownloaded, resourceAmount);

            //All resources downloaded ?
            if(resourceDownloaded >= resourceAmount)
            {
                var duration = new Date().getTime() - beginTime;
                readyCallback(duration);
            }
        }).fail(errorCallback);
    }
}
