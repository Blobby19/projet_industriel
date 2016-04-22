/**
 * Created by Luc on 22/04/2016.
 */

app.filter('analogFilter', function(){
    return function(items, value){
        var out =[{}];
        if(value === "analog"){
            for(x=0; x<items.length; x++){
                if(items[x].type == value)
                    out.push(items[x]);
            }
            return out;
        }
        else if(value !== "analog")
            return items;
    }
});