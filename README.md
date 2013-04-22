# Your Tiny Helper, Your Awesome theadFixer!

theadFixer is a simple, tiny, kind, free jQuery plugin to hold the thead of a table when scrolling.

You can feel free to use it, modify it and share it with your friends.

Features :  
Multi instance.  
Provide revert function.  
Response to $(window).resize event. (option, default will be true);  
Tested in IE8+, Chrome, FireFox.  

Better to know :  
To use this, your table should in a div container which made your table be able to scroll.  
The behind way to hold the thead is to upwrap the original table and then wrap two new table tag to each of the thead and tbody, so your table must contain the thead tag and tbody tag.  
To style the table, use `Style` and `class`, please add no more attrs to the original table tag.  
You can set width to each of the th/td within the thead, either percentage or pixel will both ok.  
If you get any disorderliness lines between your thead's td and tbody's td, try to set table and td's border style in the Demo way.  
Let me know if you like it. :)  


Contact me for more information:  

[http://mystist.github.com/][0]  

[0]: http://mystist.github.com/

# Change Log

## 2013-04-22
Fix floatMode issues.  
Just as what we know in 2013-04-16, we had added a new empty `tr` to the second table. Today, we replace the `tr` with `<thead><tr></tr></thead>` which is just the copy HTML of the origin table.

## 2013-04-16
Add option `{"floatMode":false}`.  
In many situations, we won't use the mode, so the defalut will be false.  
But some times, we may change the first `tr` data dynamic by operating the `Dom`, so the `width` attr will be breaking, then we can use `{"floatMode":true}`.  
What exactly the mode has done is that:  
1. Set `CSS` of the two tables by `position:absolute`.  
2. Add a new empty `tr` to the second table, set the `width` to each `td` of it.


## 2013-04-08  
Initial theadFixer release.








