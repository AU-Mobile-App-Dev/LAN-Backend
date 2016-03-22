/**
 * Created by Rob on 1/27/2016.
 */
//function used for togglable dropdown navbar
function dropdown(){
    var dropdownItems = document.getElementById('myDropdown');
    var icon = document.getElementById('menu-icon');
    console.log(dropdownItems.className);
    if(dropdownItems.className == "show dropdown-content"){
        dropdownItems.className = "hide";
        icon.className = "nav-menu-icon";
    }
    else{
        dropdownItems.className = "show dropdown-content";
        icon.className = "nav-menu-icon active";

    }
}
