const IMAGES_UPLOAD_DEFAULT_EXTENSIONS = ['jpg', 'jpeg', 'png', 'svg', 'ico'];
const VIDEOS_UPLOAD_DEFAULT_EXTENSIONS = ['mp4'];
const DOC_UPLOAD_DEFAULT_EXTENSIONS = ['pdf', 'docs'];
const REQUEST_STATUS = ['accepted', 'rejected', 'pending'];
const COMPLAINTORSUGGESTION = ['complaint', 'suggestion']
const ALLOWED_FILE_TYPES = {
    IMAGES: 'images',
    VIDEOS: 'videos',
    DOCS: 'docs',
    IMAGES_DOCS: 'images_docs',
};
const ALLOWED_REQUEST_STATUS = {
    ACCEPTED: 'accepted',
    REJECTED: 'rejected',
    PENDING: 'pending',
};
module.exports = {
    IMAGES_UPLOAD_DEFAULT_EXTENSIONS,
    VIDEOS_UPLOAD_DEFAULT_EXTENSIONS,
    DOC_UPLOAD_DEFAULT_EXTENSIONS,
    ALLOWED_FILE_TYPES,
    ALLOWED_REQUEST_STATUS,
    REQUEST_STATUS,
    COMPLAINTORSUGGESTION
};
