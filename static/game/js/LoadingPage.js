function LoadingPage()
{
    this.dotAmount = 0;
    this.dotInterval = null;

    this.init =
    function init()
    {
        this.dotInterval = setInterval(function()
        {

            if(this.dotAmount < 3)
            {
                $("#loadingTitle").append(".");
                this.dotAmount++;
            }
            else
            {
                $("#loadingTitle").text("Loading");
                this.dotAmount = 0;
            }
        }, 500);
    }

    this.hide =
    function hide()
    {
        clearInterval(this.dotInterval);

        //Wait for lag to stop and fade
        setTimeout(function()
        {
            $("#loadingPage").fadeOut(500);
        }, 800);
    }

    this.setText =
    function setText(text)
    {
        $("#loadingDesc").text(text);
    }
}

var LoadingPage = new LoadingPage();
