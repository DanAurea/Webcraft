var controlMap = [];
$(document).ready(function() 
{
    $(this).keydown(function(e) 
    {
        for (i=0; i<controlMap.length; i++)
        {
            if(controlMap[i]["key"] == e.key && controlMap[i]["type"] == "press")
            {
                controlMap[i]["call"](e);
                controlMap[i]["pressed"] = true;
            }
        }
    });
            
    $(this).keyup(function(e) 
    {
        for (i=0; i<controlMap.length; i++)
        {
            if(controlMap[i]["key"] == e.key && controlMap[i]["type"] == "release")
            {
                controlMap[i]["call"](e);
                controlMap[i]["pressed"] = false;
            }
        }
    });
        register("e", test, "press");
        register("e", test2, "release");
});

function register(char, callback, type)
{
	controlMap.push({"key" : char, "call" : callback, "type" : type, "pressed" : false});
}

