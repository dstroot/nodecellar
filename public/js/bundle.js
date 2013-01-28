!function(t){"use strict";t(function(){t.support.transition=function(){var t=function(){var t,e=document.createElement("bootstrap"),n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(t in n)if(void 0!==e.style[t])return n[t]}();return t&&{end:t}}()})}(window.jQuery),!function(t){"use strict";var e='[data-dismiss="alert"]',n=function(n){t(n).on("click",e,this.close)};n.prototype.close=function(e){function n(){i.trigger("closed").remove()}var i,o=t(this),a=o.attr("data-target");a||(a=o.attr("href"),a=a&&a.replace(/.*(?=#[^\s]*$)/,"")),i=t(a),e&&e.preventDefault(),i.length||(i=o.hasClass("alert")?o:o.parent()),i.trigger(e=t.Event("close")),e.isDefaultPrevented()||(i.removeClass("in"),t.support.transition&&i.hasClass("fade")?i.on(t.support.transition.end,n):n())};var i=t.fn.alert;t.fn.alert=function(e){return this.each(function(){var i=t(this),o=i.data("alert");o||i.data("alert",o=new n(this)),"string"==typeof e&&o[e].call(i)})},t.fn.alert.Constructor=n,t.fn.alert.noConflict=function(){return t.fn.alert=i,this},t(document).on("click.alert.data-api",e,n.prototype.close)}(window.jQuery),!function(t){"use strict";function e(){t(i).each(function(){n(t(this)).removeClass("open")})}function n(e){var n,i=e.attr("data-target");return i||(i=e.attr("href"),i=i&&/#/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,"")),n=i&&t(i),n&&n.length||(n=e.parent()),n}var i="[data-toggle=dropdown]",o=function(e){var n=t(e).on("click.dropdown.data-api",this.toggle);t("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};o.prototype={constructor:o,toggle:function(){var i,o,a=t(this);if(!a.is(".disabled, :disabled"))return i=n(a),o=i.hasClass("open"),e(),o||i.toggleClass("open"),a.focus(),!1},keydown:function(e){var o,a,s,r,l;if(/(38|40|27)/.test(e.keyCode)&&(o=t(this),e.preventDefault(),e.stopPropagation(),!o.is(".disabled, :disabled"))){if(s=n(o),r=s.hasClass("open"),!r||r&&27==e.keyCode)return 27==e.which&&s.find(i).focus(),o.click();a=t("[role=menu] li:not(.divider):visible a",s),a.length&&(l=a.index(a.filter(":focus")),38==e.keyCode&&l>0&&l--,40==e.keyCode&&a.length-1>l&&l++,~l||(l=0),a.eq(l).focus())}}};var a=t.fn.dropdown;t.fn.dropdown=function(e){return this.each(function(){var n=t(this),i=n.data("dropdown");i||n.data("dropdown",i=new o(this)),"string"==typeof e&&i[e].call(n)})},t.fn.dropdown.Constructor=o,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=a,this},t(document).on("click.dropdown.data-api touchstart.dropdown.data-api",e).on("click.dropdown.data-api touchstart.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("touchstart.dropdown.data-api",".dropdown-menu",function(t){t.stopPropagation()}).on("click.dropdown.data-api touchstart.dropdown.data-api",i,o.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",i+", [role=menu]",o.prototype.keydown)}(window.jQuery),!function(t){"use strict";var e=function(e,n){this.$element=t(e),this.options=t.extend({},t.fn.button.defaults,n)};e.prototype.setState=function(t){var e="disabled",n=this.$element,i=n.data(),o=n.is("input")?"val":"html";t+="Text",i.resetText||n.data("resetText",n[o]()),n[o](i[t]||this.options[t]),setTimeout(function(){"loadingText"==t?n.addClass(e).attr(e,e):n.removeClass(e).removeAttr(e)},0)},e.prototype.toggle=function(){var t=this.$element.closest('[data-toggle="buttons-radio"]');t&&t.find(".active").removeClass("active"),this.$element.toggleClass("active")};var n=t.fn.button;t.fn.button=function(n){return this.each(function(){var i=t(this),o=i.data("button"),a="object"==typeof n&&n;o||i.data("button",o=new e(this,a)),"toggle"==n?o.toggle():n&&o.setState(n)})},t.fn.button.defaults={loadingText:"loading..."},t.fn.button.Constructor=e,t.fn.button.noConflict=function(){return t.fn.button=n,this},t(document).on("click.button.data-api","[data-toggle^=button]",function(e){var n=t(e.target);n.hasClass("btn")||(n=n.closest(".btn")),n.button("toggle")})}(window.jQuery),!function(t){"use strict";var e=function(e,n){this.$element=t(e),this.options=t.extend({},t.fn.collapse.defaults,n),this.options.parent&&(this.$parent=t(this.options.parent)),this.options.toggle&&this.toggle()};e.prototype={constructor:e,dimension:function(){var t=this.$element.hasClass("width");return t?"width":"height"},show:function(){var e,n,i,o;if(!this.transitioning&&!this.$element.hasClass("in")){if(e=this.dimension(),n=t.camelCase(["scroll",e].join("-")),i=this.$parent&&this.$parent.find("> .accordion-group > .in"),i&&i.length){if(o=i.data("collapse"),o&&o.transitioning)return;i.collapse("hide"),o||i.data("collapse",null)}this.$element[e](0),this.transition("addClass",t.Event("show"),"shown"),t.support.transition&&this.$element[e](this.$element[0][n])}},hide:function(){var e;this.transitioning||(e=this.dimension(),this.reset(this.$element[e]()),this.transition("removeClass",t.Event("hide"),"hidden"),this.$element[e](0))},reset:function(t){var e=this.dimension();return this.$element.removeClass("collapse")[e](t||"auto")[0].offsetWidth,this.$element[null!==t?"addClass":"removeClass"]("collapse"),this},transition:function(e,n,i){var o=this,a=function(){"show"==n.type&&o.reset(),o.transitioning=0,o.$element.trigger(i)};this.$element.trigger(n),n.isDefaultPrevented()||(this.transitioning=1,this.$element[e]("in"),t.support.transition&&this.$element.hasClass("collapse")?this.$element.one(t.support.transition.end,a):a())},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};var n=t.fn.collapse;t.fn.collapse=function(n){return this.each(function(){var i=t(this),o=i.data("collapse"),a=t.extend({},t.fn.collapse.defaults,i.data(),"object"==typeof n&&n);o||i.data("collapse",o=new e(this,a)),"string"==typeof n&&o[n]()})},t.fn.collapse.defaults={toggle:!0},t.fn.collapse.Constructor=e,t.fn.collapse.noConflict=function(){return t.fn.collapse=n,this},t(document).on("click.collapse.data-api","[data-toggle=collapse]",function(e){var n,i=t(this),o=i.attr("data-target")||e.preventDefault()||(n=i.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,""),a=t(o).data("collapse")?"toggle":i.data();i[t(o).hasClass("in")?"addClass":"removeClass"]("collapsed"),t(o).collapse(a)})}(window.jQuery),window.utils={loadTemplate:function(t,e){var n=[];$.each(t,function(t,e){window[e]?n.push($.get("tpl/"+e+".html",function(t){window[e].prototype.template=_.template(t)})):alert(e+" not found")}),$.when.apply(null,n).done(e)},displayValidationErrors:function(t){for(var e in t)t.hasOwnProperty(e)&&this.addValidationError(e,t[e]);this.showAlert("Warning!","Fix validation errors and try again","alert-warning")},addValidationError:function(t,e){var n=$("#"+t).parent().parent();n.addClass("error"),$(".help-inline",n).html(e)},removeValidationError:function(t){var e=$("#"+t).parent().parent();e.removeClass("error"),$(".help-inline",e).html("")},showAlert:function(t,e,n){$(".alert").removeClass("alert-error alert-warning alert-success alert-info"),$(".alert").addClass(n),$(".alert").html("<strong>"+t+"</strong> "+e),$(".alert").show()},hideAlert:function(){$(".alert").hide()}},window.Wine=Backbone.Model.extend({urlRoot:"/wines",idAttribute:"_id",initialize:function(){this.validators={},this.validators.name=function(t){return t.length>0?{isValid:!0}:{isValid:!1,message:"You must enter a name"}},this.validators.grapes=function(t){return t.length>0?{isValid:!0}:{isValid:!1,message:"You must enter a grape variety"}},this.validators.country=function(t){return t.length>0?{isValid:!0}:{isValid:!1,message:"You must enter a country"}}},validateItem:function(t){return this.validators[t]?this.validators[t](this.get(t)):{isValid:!0}},validateAll:function(){var t={};for(var e in this.validators)if(this.validators.hasOwnProperty(e)){var n=this.validators[e](this.get(e));n.isValid===!1&&(t[e]=n.message)}return _.size(t)>0?{isValid:!1,messages:t}:{isValid:!0}},defaults:{_id:null,name:"",grapes:"",country:"USA",region:"California",year:"",description:"",picture:null}}),window.WineCollection=Backbone.Collection.extend({model:Wine,url:"/wines"}),window.Paginator=Backbone.View.extend({className:"pagination pagination-centered",initialize:function(){this.model.bind("reset",this.render,this),this.render()},render:function(){var t=this.model.models,e=t.length,n=Math.ceil(e/8);$(this.el).html("<ul />");for(var i=0;n>i;i++)$("ul",this.el).append("<li"+(i+1===this.options.page?" class='active'":"")+"><a href='#wines/page/"+(i+1)+"'>"+(i+1)+"</a></li>");return this}}),window.HeaderView=Backbone.View.extend({initialize:function(){this.render()},render:function(){return $(this.el).html(this.template()),this},selectMenuItem:function(t){$(".nav li").removeClass("active"),t&&$("."+t).addClass("active")}}),window.HomeView=Backbone.View.extend({initialize:function(){this.render()},render:function(){return $(this.el).html(this.template()),this}}),window.WineListView=Backbone.View.extend({initialize:function(){this.render()},render:function(){var t=this.model.models,e=t.length,n=8*(this.options.page-1),i=Math.min(n+8,e);$(this.el).html('<div class="container"><div class="row-fluid"><div class="span12"><br><br><ul class="thumbnails"></ul>');for(var o=n;i>o;o++)$(".thumbnails",this.el).append(new WineListItemView({model:t[o]}).render().el);return $(".span12",this.el).append(new Paginator({model:this.model,page:this.options.page}).render().el),$(".pagination",this.el).append("</div></div></div>"),this}}),window.WineListItemView=Backbone.View.extend({tagName:"li",initialize:function(){this.model.bind("change",this.render,this),this.model.bind("destroy",this.close,this)},render:function(){return $(this.el).html(this.template(this.model.toJSON())),this}}),window.WineView=Backbone.View.extend({initialize:function(){this.render()},render:function(){return $(this.el).html(this.template(this.model.toJSON())),this},events:{change:"change","click .save":"beforeSave","click .delete":"deleteWine","drop #picture":"dropHandler","dragover #picture":"dragoverHandler"},change:function(t){utils.hideAlert();var e=t.target,n={};n[e.name]=e.value,this.model.set(n);var i=this.model.validateItem(e.id);i.isValid===!1?utils.addValidationError(e.id,i.message):utils.removeValidationError(e.id)},beforeSave:function(){var t=this.model.validateAll();return t.isValid===!1?(utils.displayValidationErrors(t.messages),!1):(this.saveWine(),!1)},saveWine:function(){var t=this;console.log("before save"),this.model.save(null,{success:function(e){t.render(),app.navigate("wines/"+e.id,!1),utils.showAlert("Success!","Wine saved successfully","alert-success")},error:function(){utils.showAlert("Error","An error occurred while trying to delete this item","alert-error")}})},deleteWine:function(){return this.model.destroy({success:function(){alert("Wine deleted successfully"),window.history.back()}}),!1},dropHandler:function(t){t.stopPropagation(),t.preventDefault();var e=t.originalEvent;e.dataTransfer.dropEffect="copy",this.pictureFile=e.dataTransfer.files[0];var n=new FileReader;n.onloadend=function(){$("#picture").attr("src",n.result)},n.readAsDataURL(this.pictureFile)},dragoverHandler:function(t){t.preventDefault()}}),window.AboutView=Backbone.View.extend({initialize:function(){this.render()},render:function(){return $(this.el).html(this.template()),this}});var AppRouter=Backbone.Router.extend({routes:{"":"home",wines:"list","wines/page/:page":"list","wines/add":"addWine","wines/:id":"wineDetails",about:"about"},initialize:function(){this.headerView=new HeaderView,$("#header").html(this.headerView.el)},home:function(){this.homeView||(this.homeView=new HomeView),$("#content").html(this.homeView.el),this.headerView.selectMenuItem("home-menu")},list:function(t){var e=t?parseInt(t,10):1,n=new WineCollection;n.fetch({success:function(){$("#content").html(new WineListView({model:n,page:e}).el)}}),this.headerView.selectMenuItem("browse-menu")},wineDetails:function(t){var e=new Wine({_id:t});e.fetch({success:function(){$("#content").html(new WineView({model:e}).el)}}),this.headerView.selectMenuItem("browse-menu")},addWine:function(){var t=new Wine;$("#content").html(new WineView({model:t}).el),this.headerView.selectMenuItem("add-menu")},about:function(){this.aboutView||(this.aboutView=new AboutView),$("#content").html(this.aboutView.el),this.headerView.selectMenuItem("about-menu")}});utils.loadTemplate(["HomeView","HeaderView","WineView","WineListItemView","AboutView"],function(){app=new AppRouter,Backbone.history.start()});