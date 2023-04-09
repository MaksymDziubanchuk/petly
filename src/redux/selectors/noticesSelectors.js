export const getStore = ({notices}) => ({loading: notices.loading, error: notices.error});

export const getNotices = ({ notices }) => notices.items;

export const getFavoriteNotice =   ({ notices }) => notices.isNotisFavorite;

export const getTotalNotices = ({notices}) => notices.totalNotices;