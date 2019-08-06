import * as types from 'lib-vuex/mutation-types';

export default {

    [types.GET_IMAGES_SUCCESS] (state, images) {
        state.images = images;
    },

    [types.GET_IMAGES_FAIL] (state) {
        state.images = [];
    },

    [types.GET_IMAGE_SUCCESS] (state, selectedImage) {
        state.selectedImage = selectedImage;
    },

    [types.GET_IMAGE_FAIL] (state) {
        state.selectedImage = {};
    },

    [types.CREATE_IMAGE_SUCCESS] (state, newImage) {
        state.images.push(newImage);
        state.saveNewErrors = {};
    },

    [types.CREATE_IMAGE_FAIL] (state, error) {
        state.saveNewErrors = error;
    },

    [types.EDIT_IMAGE_SUCCESS] (state, editedImage) {
        const editedImageIndex = _.findIndex(state.images,  image => image.objectId === editedImage.objectId);
        Vue.set(state.images, editedImageIndex, editedImage);
        state.editNewErrors = {};
        state.selectedImage = {};
    },

    [types.EDIT_IMAGE_FAIL] (state, error) {
        state.editNewErrors = error;
    },

    [types.DELETE_IMAGE_SUCCESS] (state) {
        if (state.selectedImage && state.images) {
            const deletedNewIndex = _.findIndex(state.images,  image => image.objectId === state.selectedImage.objectId);
            state.images.splice(deletedNewIndex, 1);
            state.selectedImage = {};
        }
    },

    [types.DELETE_IMAGE_FAIL] (state, error) {
        state.deleteImageErrors = error;
    }
}
