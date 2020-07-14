define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class PageHeaderView extends ComponentView {

    preRender() {
      this.listenTo(Adapt, {
        "device:changed": this.onDeviceResize,
        "remove": this.remove
      });
    }

    postRender() {
      this.setReadyStatus();

      if (this.model.get('_setCompletionOn') === 'inview') {
        this.setupInviewCompletion();
      }

      this.setStyles();
    }

    onDeviceResize() {
      this.setStyles();
    }

    setStyles() {
      this.setBackgroundImages();
      // this.setBackgroundStyles();
      // this.extendComponentContainer();
      this.setMinimumHeight();
      // this.setFullLayoutOptions();
    }

    setBackgroundImages() {
      const backgroundImages = this.model.get("_backgroundImage");

      if (!backgroundImages) return;

      let backgroundImage;

      switch (Adapt.device.screenSize) {
        case "large":
          backgroundImage = backgroundImages._large;
          break;
        case "medium":
          backgroundImage = backgroundImages._medium;
          break;
        default:
          backgroundImage = backgroundImages._small;
      }

      if (backgroundImage) {
        this.$el.parent()
          .addClass("has-bg-image")
          .css("background-image", `url(${backgroundImage})`);
      } else {
        this.$el.parent()
          .removeClass("has-bg-image")
          .css("background-image", "");
      }
    }

    setMinimumHeight() {
      const minimumHeights = this.model.get("_minimumHeights");

      if (!minimumHeights) return;

      let minimumHeight;

      switch (Adapt.device.screenSize) {
        case "large":
          minimumHeight = minimumHeights._large;
          break;
        case "medium":
          minimumHeight = minimumHeights._medium;
          break;
        default:
          minimumHeight = minimumHeights._small;
      }

      if (minimumHeight) {
        this.$el
          .addClass("has-min-height")
          .css("min-height", `${minimumHeight}px`);
      } else {
        this.$el
          .removeClass("has-min-height")
          .css("min-height", "");
      }
    }

    // setFullLayoutOptions() {
    //   const options = this.model.get("_fullLayoutOptions");

    //   if (!options || this.model.get("_layout") !== "full") return;

    //   if (Adapt.device.screenSize === "large") {
    //     this.$(".banner__header").css({
    //       top: `${options._top}%`,
    //       left: `${options._left}%`,
    //       width: `${options._width}%`
    //     });
    //   } else {
    //     this.$(".banner__header").css({
    //       top: "",
    //       left: "",
    //       width: ""
    //     });
    //   }
    // }

    onRemove() {}
  }

  PageHeaderView.template = 'pageHeader';

  return Adapt.register('pageHeader', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: PageHeaderView
  });

});
