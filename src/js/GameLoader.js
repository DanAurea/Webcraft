function onDownloadFinished(duration)
{
    console.log("Finished download in: " + duration + "ms");
    initGame();
    initDebugger();
}

/*
 * Called on a resource download finish
 * Params :
 *  downloadedAmount : Amount of resource downloaded
 *  totalAmount      : Total amount resource to download
 */
function onDownloadUpdate(downloadedAmount, totalAmount)
{
    console.log("Downloaded file : " + downloadedAmount + " / " + totalAmount + "(" + parseInt((downloadedAmount / totalAmount) * 100) + "%)");
}

/*
 * Called on a resource download error
 * Params :
 *  error : Error returned by JQuery
 */
function onDownloadError(error)
{
    console.error("Failed to download resources :");
    console.error(error);
}

// Game Start
$(function()
{
    console.log("Game Starting...");
    console.log("Download game resources...");
    ResourceLoader.downloadGameResources(onDownloadFinished, onDownloadUpdate, onDownloadError);
});
