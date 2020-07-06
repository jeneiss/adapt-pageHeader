define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class BannerView extends ComponentView {

    preRender() {
      this.listenTo(Adapt, {
        "device:changed": this.onDeviceResize,
        "remove": this.remove
      });
      this.setStyles();
    }

    postRender() {
      this.setReadyStatus();

      if (this.model.get('_setCompletionOn') === 'inview') {
        this.setupInviewCompletion();
      }
    }

    onDeviceResize() {
      this.setStyles();
    }

    setStyles() {
      this.setBackgroundImage();
    }

    setBackgroundImage() {
      const currentBlockId = this.model.get("_parentId");
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
        this.$el.parents(`.${currentBlockId}`)
          .addClass("has-bg-image")
          .css("background-image", "url(" + backgroundImage + ")");
      } else {
        this.$el.parents(`.${currentBlockId}`)
          .removeClass("has-bg-image")
          .css("background-image", "");
      }
    }

    onRemove() {}
  }

  BannerView.template = 'banner';

  return Adapt.register('banner', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: BannerView
  });

});
