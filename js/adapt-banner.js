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

    }

    postRender() {
      this.setReadyStatus();

      if (this.model.get('_setCompletionOn') === 'inview') {
        this.setupInviewCompletion();
      }

      this.setImage();
    }

    onDeviceResize() {
      this.setImage();
    }

    setImage() {
      const images = this.model.get("_graphic");

      if (!images) return;

      let image;

      switch (Adapt.device.screenSize) {
        case "large":
          image = images.large;
          break;
        case "medium":
          image = images.medium;
          break;
        default:
          image = images.small;
      }

      this.$('.js-banner-set-image-src').attr('src', image);

      this.$('.banner__widget').imageready(function() {

        this.setReadyStatus();

      }.bind(this));
    }

    onRemove() {}
  }

  BannerView.template = 'banner';

  return Adapt.register('banner', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: BannerView
  });

});
