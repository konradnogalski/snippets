// ==UserScript==
// @name         DummyData
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @grant        none
// @require http://code.jquery.com/jquery-3.5.0.min.js
// ==/UserScript==

(function() {
    'use strict';
    let categories = [
        {
            name: "Users-Accept",
            dataSets: [
                {
                    name: "Admin User",
                    data:{
                        name: "konrad.admin",
                        password: "1"
                    },
                },
                {
                    name: "Api User",
                    data:{
                        name: "konrad.apis",
                        password: "12" },
                },
                {
                    name: "Accountat",
                    data:{
                        name: "konrad.accountant",
                        password: "123" },
                },

            ]
        },
        {
            name: "Users-Test",
            dataSets: [
                {
                    name: "Admin User T",
                    data:{
                        name: "konrad.admin.test",
                        password: "1"
                    },
                },
                {
                    name: "Api User T",
                    data:{
                        name: "konrad.apis.test",
                        password: "12" },
                },
                {
                    name: "Accountat T",
                    data:{
                        name: "konrad.accountant.test",
                        password: "123" },
                },

            ]
        }
    ];


    let fieldSelectors = {
      name:"#inputUsername",
      password:"#inputPassword"
    }

    let userNameField = $(fieldSelectors.name);
    let passwordField = $(fieldSelectors.password);

    let div = $("<div><ul></ul></div>")
                 .mouseleave(function() {
                     $(this).slideUp("fast")
                 });

    categories.forEach(function(category){
        $("<li data-category='"+ category.name +"'>" + category.name  + "<div style=display:none><ul></ul></div></li>")
           .on("click", function(){
              let categoryDataSetContainer = $(this).children();
              if(categoryDataSetContainer.css("display") === "none"){
                  categoryDataSetContainer.slideDown("fast");
              } else {
                  categoryDataSetContainer.slideUp("fast");
              }
            })
            .mouseenter(function(){ $(this).css({ backgroundColor: "#5d9bc3", color: "white"}) })
            .appendTo(div.find("> ul"));

        category.dataSets.forEach(function(dataSet){
          $("<li data-set='" + dataSet.name + "'>" + dataSet.name + "</li>")
              .css({ borderBottom:"1px solid #c3c3c3", fontSize:"0.75rem"})
              .click(function(e){
                     userNameField.val(dataSet.data.name);
                     passwordField.val(dataSet.data.password);
                     div.slideUp("fast")})
              .mouseenter(function(){ $(this).css({ fontWeight: "bold", color: "white"}) })
              .appendTo(div.find("li[data-category='" + category.name + "'] > div > ul"));
        });

        div.find("ul").css({ listStyleType:"none", margin: 0, padding:0, textAlign: "left" });

        div.find("li")
            .css({padding: "5px 10px"})
            .mouseleave(function(){ $(this).css({ fontWeight: "normal", backgroundColor: "inherit", color: "inherit"})});


    });

    userNameField.on("contextmenu", function(ev){
        ev.preventDefault();

        div.css({
            "backgroundColor":"white",
            "position":"absolute",
            "left":ev.target.offsetLeft + "px",
            "top":ev.target.offsetTop +  ev.target.offsetHeight - ev.target.style.marginBottom + "px",
            "width":ev.target.offsetWidth + "px",
            "borderTopWidth":$(ev.target).css("borderTopWidth")
        })
            .appendTo("body")
            .slideDown("fast");
    });
})();


