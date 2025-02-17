// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {
//   getProfile,
//   getNotification,
//   getRecipeOfTheDay,
//   getRecipeOfTheDayToday,
//   getCountries,
//   getRepost,
//   getFollowings,
//   getFollowers,
//   getMyFollowings,
//   getMyFollowers,
//   getblocked,
//   getBids,
//   getBlockedUsers,
//   updateProfile,
//   getTotalStatics,
//   getOutgoingBids,
//   getPerPostStatics,
// } from '../../api/auth';

// import {
//   getFilters,
//   getPosts,
//   likeComment,
//   likePost,
//   postComment,
//   unlikeComment,
//   dislikePost,
//   getLessons,
// } from '../../api/post';
// import {getItem} from '../../utils/Functions';
// import Toast from 'react-native-simple-toast';

// export const fetchUserProfile = createAsyncThunk(
//   'user/fetchUserProfile',
//   async params => {
//     try {
//       const token = await getItem('token');
//       const loginUser = await getItem('loginUser');
//       const userData = JSON.parse(loginUser);
//       const response = await getProfile(userData?.id, token, params);
//       return response.data;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//     }
//   },
// );
// export const updateUserProfile = createAsyncThunk(
//   'user/updateUserProfile',
//   async payload => {
//     try {
//       const token = await getItem('token');
//       const loginUser = await getItem('loginUser');
//       const userData = JSON.parse(loginUser);
//       const response = await updateProfile(
//         payload.updatedProfile,
//         userData?.id,
//         token,
//       );
//       Toast.show('Profile Updated');
//       return response.data;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//     }
//   },
// );

// export const fetchCountries = createAsyncThunk(
//   'user/fetchCountries',
//   async (userId, thunkAPI) => {
//     try {
//       const token = await getItem('token');
//       const res = await getCountries(token);
//       const countries = res.data;
//       return countries;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`);
//     }
//   },
// );

// export const fetchNotifications = createAsyncThunk(
//   'user/fetchNotifications',
//   async (userId, thunkAPI) => {
//     try {
//       const token = await getItem('token');
//       const response = await getNotification(`?user=${userId}`, token);
//       return response.data.results;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`);
//     }
//   },
// );

// export const fetchRecipeOfTheDay = createAsyncThunk(
//   'user/fetchRecipeOfTheDay',
//   async () => {
//     try {
//       const token = await getItem('token');
//       const response = await getRecipeOfTheDay(token);
//       return response.data.results;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//     }
//   },
// );

// export const fetchRecipeOfTheDayToday = createAsyncThunk(
//   'user/fetchRecipeOfTheDayToday',
//   async () => {
//     try {
//       const token = await getItem('token');
//       const response = await getRecipeOfTheDayToday(token);
//       return response?.data || {};
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`)
//     }
//   },
// );

// export const fetchFilters = createAsyncThunk('user/fetchFilters', async () => {
//   try {
//     const token = await getItem('token');
//     const res = await getFilters(token);
//     return res?.data?.results;
//   } catch (error) {
//     const errorText = Object.values(error?.response?.data);
//     // Toast.show(`Error: ${errorText}`)
//   }
// });

// export const postReposts = createAsyncThunk(
//   'user/postReposts',
//   async payload => {
//     try {
//       const token = await getItem('token');
//       const res = await getRepost(payload, token);
//       return res?.data;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`)
//     }
//   },
// );

// export const fetchUserFollowings = createAsyncThunk(
//   'user/fetchUserFollowings',
//   async userID => {
//     try {
//       const token = await getItem('token');
//       const res = await getFollowings(userID, token);
//       const res1 = await getFollowers(userID, token);
//       return {res, res1};
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`)
//     }
//   },
// );

// export const fetchMyFollowings = createAsyncThunk(
//   'user/fetchMyFollowings',
//   async () => {
//     try {
//       const token = await getItem('token');
//       const res = await getMyFollowings(token);
//       const res1 = await getMyFollowers(token);
//       return {res, res1};
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`);
//     }
//   },
// );

// export const fetchAllPosts = createAsyncThunk(
//   'fetchAllPosts',
//   async ({page, payload, screen, postType}, {rejectWithValue}) => {
//     try {
//       const token = await getItem('token');
//       const body = payload || {newest: true};
//       const res = await getPosts(page, body, token);
//       const normalizedData = res?.data?.results || res?.data || [];
//       const totalPages = res?.data?.page_count || 1;
//       return {posts: normalizedData, page, screen, totalPages, postType};
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`)
//     }
//   },
// );

// export const _likePost = createAsyncThunk('user/likePost', async id => {
//   try {
//     const token = await getItem('token');
//     const payload = {post: id};
//     const response = await likePost(payload, token);
//     return response
//   } catch (error) {
//     const errorText = Object.values(error?.response?.data);
//     // Toast.show(`Error: ${errorText}`)
//   }
// });

// export const _dislikePost = createAsyncThunk('user/dislikePost', async id => {
//   try {
//     const token = await getItem('token');
//     const payload = {post: id};
//     const response = await dislikePost(payload, token);
//     return response
//     // return "success"
//   } catch (error) {
//     const errorText = Object.values(error?.response?.data);
//     // Toast.show(`Error: ${errorText}`)
//   }
// });

// export const _postComment = createAsyncThunk(
//   'user/postComment',
//   async payload => {
//     try {
//       const token = await getItem('token');
//       await postComment(payload, token);
//       getPosts({newest: true});
//       // return "success"
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`)
//     }
//   },
// );

// export const _likeComment = createAsyncThunk('user/likeComment', async id => {
//   try {
//     const token = await getItem('token');
//     const payload = {comment: id};
//     await likeComment(payload, token);
//     getPosts({newest: true});
//     // return "success"
//   } catch (error) {
//     const errorText = Object.values(error?.response?.data);
//     // Toast.show(`Error: ${errorText}`)
//   }
// });

// export const _unlikeComment = createAsyncThunk(
//   'user/unlikeComment',
//   async id => {
//     try {
//       const token = await getItem('token');
//       const payload = {comment: id};
//       await unlikeComment(payload, token);
//       getPosts({newest: true});
//       // return "success"
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`)
//     }
//   },
// );
// export const _getTotalStatics = createAsyncThunk(
//   'user/getTotalStatics',
//   async payload => {
//     try {
//       const token = await getItem('token');
//       const res = await getTotalStatics(payload, token);
//       return res;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//     }
//   },
// );

// export const _getPostStatics = createAsyncThunk(
//   'user/getPostStatics',
//   async payload => {
//     try {
//       const token = await getItem('token');
//       const res = await getPerPostStatics(payload, token);
//       return res;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//     }
//   },
// );

// export const _getLessons = createAsyncThunk('user/getLessons', async () => {
//   try {
//     const token = await getItem('token');
//     const res = await getLessons(token);
//     return res?.data;
//   } catch (error) {
//     setLessonLoading(false);
//     const errorText = Object.values(error?.response?.data);
//     // Toast.show(`Error: ${errorText}`)
//   }
// });

// export const _getBlocked = createAsyncThunk('user/getBlocked', async () => {
//   try {
//     const token = await getItem('token');
//     const res = await getblocked(userId, token);
//     const response = res?.data?.result;
//     return response;
//   } catch (error) {
//     const errorText = Object.values(error?.response?.data);
//     // Toast.show(`Error: ${errorText}`)
//   }
// });

// export const _getBids = createAsyncThunk('user/getBids', async payload => {
//   try {
//     const body = payload || {};
//     const token = await getItem('token');
//     const res = await getBids(body, token);
//     return res.data;
//   } catch (error) {
//     const errorText = Object.values(error?.response?.data);
//     // Toast.show(`Error: ${errorText}`)
//   }
// });
// export const _getOutgoingBids = createAsyncThunk(
//   'user/getOutgoingBids',
//   async payload => {
//     try {
//       const body = payload || {};
//       const token = await getItem('token');
//       const res = await getOutgoingBids(body, token);
//       return res.data;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`)
//     }
//   },
// );
// export const _getBlockedUsers = createAsyncThunk(
//   'user/getBlockedUsers',
//   async () => {
//     try {
//       const token = await getItem('token');
//       const response = await getBlockedUsers(token);
//       const blockedIds = response.data.map(item => item.blocked.id);
//       return blockedIds;
//     } catch (error) {
//       const errorText = Object.values(error?.response?.data);
//       // Toast.show(`Error: ${errorText}`)
//     }
//   },
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     postLoading: false,
//     homePostLoading: false,
//     globalPostLoading: false,
//     userProfilePostLoading: false,
//     userProfilePosts: null,
//     userProfilePage: 0,
//     userProfileTotalPage: 0,
//     followers: [],
//     followings: [],
//     myFollowings: [],
//     myFollowers: [],
//     respostShare: [],
//     allFilters: [],
//     userData: null,
//     otherUserData: false,
//     countries: [],
//     notifications: [],
//     recipeOfTheDay: [],
//     recipeOfTheDayToday: false,
//     loading: false,
//     error: null,
//     posts: null,
//     homeScreenPosts: null,
//     globalScreenPosts: null,
//     homePage: 1,
//     homeTotalPageCount: 1,
//     cookbookPage: 0,
//     totalPageCount: 1,
//     notificationLoading: false,
//     lessonLoading: false,
//     lessons: null,
//     bidLoading: false,
//     bids: [],
//     blocked: null,
//     blockedUsers: [],
//     page: 1,
//     hasMoreData: true,
//     numberToScroll: 0,
//     isRecipeButtonVisible: true,
//     intialSwapHomeScreen: 0,
//     outgoingBids: [],
//     countryPosts: null,
//     countryPostLoading: false,
//     countryPostpage: 0,
//     countryTotalPageCount: 1,
//     bidDetails: false,
//     isLiked:false,
//     isDisliked:false,
//     recipeModalData: false,
//     recipeModalDataIndex: 0,
//     countryPostListData: [],
//     countryPostListModalData: false,
//     countryPostListModalDataIndex: 0,
//     modalCommentData: false,
//     modalCommentDataIndex: 0,
//     modalCommentDataScreen: '',
//     savedPostsData: [],
//     taggedPostsData: [],
//     purchasedPostsData: [],
//     feedVisibleVideo: null,
//     feedVisibleVideoTime: null,
//     postStatics: [],
//     postsHeight: [],
//     updateLoading: false,
//     postStatics: [],
//     postsHeight: []

//   },
//   reducers: {
//     numberToScrollFun: state => {
//       state.numberToScroll = state.numberToScroll + Number(1);
//     },
//     isRecipeButtonVisibleFun: (state, action) => {
//       state.isRecipeButtonVisible = action.payload;
//     },
//     setSwapHomeScreen: state => {
//       state.intialSwapHomeScreen = state;
//     },
//     setBidDetails: (state, action) => {
//       state.bidDetails = action.payload;
//     },
//     setPostLike: (state, action) => {
//       state.isLiked = action.payload
//     },
//     setPostDislike: (state, action) => {
//       state.isDisliked = action.payload
//     },
//     setRecipeModalData: (state, action) => {
//       state.recipeModalData = action.payload.data
//       state.recipeModalDataIndex = action.payload.index
//     },
//     setHomePostsData: (state, action) => {
//       state.homeScreenPosts = action.payload
//     },
//     setCountryListData: (state, action) => {
//       state.countryPostListData = action.payload
//     },
//     setCountryPostListModal: (state, action) => {
//       state.countryPostListModalData = action.payload.data,
//       state.countryPostListModalDataIndex = action.payload.index
//     },
//     setModalCommentData: (state, action) => {
//       state.modalCommentData = action.payload.data,
//       state.modalCommentDataIndex = action.payload.index,
//       state.modalCommentDataScreen = action.payload.screen
//     },
//     setOtherUserData: (state, action) => {
//       state.otherUserData = action.payload
//     },
//     setFeedVisibleVideo: (state, action) => {
//       state.feedVisibleVideo = action.payload
//     },
//     setFeedVisibleVideoTime: (state, action) => {
//       state.feedVisibleVideoTime = action.payload
//     },
//     setPostsHeight: (state, action) => {
//       state.postsHeight = action.payload
//     }
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchUserProfile.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userData = action.payload;
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(updateUserProfile.pending, state => {
//         state.updateLoading = true;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.updateLoading = false;
//         state.userData = action.payload;
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.updateLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchCountries.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchCountries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.countries = action.payload;
//       })
//       .addCase(fetchCountries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchNotifications.pending, (state, action) => {
//         state.notificationLoading = true;
//       })
//       .addCase(fetchNotifications.fulfilled, (state, action) => {
//         state.notifications = action.payload;
//         state.notificationLoading = false;
//       })
//       .addCase(fetchNotifications.rejected, (state, action) => {
//         state.notificationLoading = false;
//       })
//       .addCase(fetchRecipeOfTheDay.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recipeOfTheDay = action.payload;
//       })
//       .addCase(fetchRecipeOfTheDayToday.fulfilled, (state, action) => {
//         state.recipeOfTheDayToday = action.payload;
//       })
//       .addCase(fetchFilters.fulfilled, (state, action) => {
//         state.allFilters = action.payload;
//       })
//       .addCase(postReposts.pending, (state, action) => {
//         state.postLoading = true;
//       })
//       .addCase(postReposts.fulfilled, (state, action) => {
//         state.respostShare = action.payload;
//       })
//       .addCase(fetchUserFollowings.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(fetchUserFollowings.fulfilled, (state, action) => {
//         state.followings = action.payload.res?.data?.results;
//         state.followers = action.payload.res1?.data?.results;
//         state.loading = false;
//       })
//       .addCase(fetchUserFollowings.rejected, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(fetchAllPosts.pending, (state, action) => {
//         if (action?.meta?.arg?.screen == 'home') {
//           state.homePostLoading = true;
//         } else if (action?.meta?.arg?.screen == 'cookbook') {
//           state.globalPostLoading = true;
//         } else if (action?.meta?.arg?.screen == 'globe') {
//           state.countryPostLoading = true;
//         } else if (action?.meta?.arg?.screen == 'user_profile') {
//           state.userProfilePostLoading = true;
//         }
//         state.postLoading = true;
//       })
//       .addCase(fetchAllPosts.fulfilled, (state, action) => {
//         const {posts, page, screen, totalPages, postType} = action.payload;
//         if (screen == 'home') {
//           state.homeTotalPageCount = totalPages;
//           if (!page) {
//             state.homeScreenPosts = posts;
//           } else if (page === 1) {
//             state.homeScreenPosts = posts;
//             state.postLoading = false;
//           } else {
//             state.homeScreenPosts = [...state.homeScreenPosts, ...posts];
//             state.homePage = page;
//           }
//           state.homePostLoading = false;
//         } else if (screen == 'cookbook') {
//           state.totalPageCount = totalPages;
//           if (!page) {
//             state.globalScreenPosts = posts;
//             state.globalPostLoading = false;
//           } else if (page === 1) {
//             state.cookbookPage = page;

//             state.globalScreenPosts = posts;
//             state.globalPostLoading = false;
//           } else {
//             state.cookbookPage = page;
//             state.totalPageCount = totalPages;
//             state.globalScreenPosts = [...state.globalScreenPosts, ...posts];
//           }
//           state.globalPostLoading = false;
//         }  
//         // ------------------------
//         else if (screen == 'globe') {
//           state.countryTotalPageCount = totalPages;
//           if (!page) {
//             state.countryPosts = posts;
//             state.countryPostLoading = false;
//           } else if (page === 1) {
//             state.countryPostpage = page;
//             state.countryPosts = posts;
//             state.countryPostLoading = false;
//           } else {
//             state.countryPostpage = page;
//             state.countryTotalPageCount = totalPages;
//             state.countryPosts = [...state.countryPosts, ...posts];
//           }
//           state.countryPostLoading = false;
//         } else if (screen == 'user_profile') {
//           state.userProfileTotalPage = totalPages;
//           if (!page) {
//             state.userProfilePosts = posts;
//             state.userProfilePostLoading = false;
//           } else if (page === 1) {
//             state.userProfilePage = page;
//             state.userProfilePosts = posts;
//             state.userProfilePostLoading = false;
//           } else {
//             state.userProfilePage = page;
//             state.userProfileTotalPage = totalPages;
//             state.userProfilePosts = [...state.userProfilePosts, ...posts];
//           }
//           state.userProfilePostLoading = false;
//         }

//         if(postType == 'is_saved'){
//           state.savedPostsData = posts;
//         } else if (postType == 'is_tagged'){
//           state.taggedPostsData = posts;
//         } else if (postType == 'purchased_post') {
//           state.purchasedPostsData = posts;

//         }
//         if (!page) {
//           state.posts = posts;
//         } else if (page === 1) {
//           state.posts = posts;
//         } else {
//           state.posts = [...state.posts, ...posts];
//         }
//         state.page = page;
//         state.hasMoreData = posts.length > 0;
//         state.postLoading = false;
//       })
//       // .addCase(_likePost.fulfilled, (state, action) => {
//       //   return "success"
//       // })
//       // .addCase(_dislikePost.fulfilled, (state, action) => {
//       //   return "success"
//       // })
//       .addCase(_postComment.fulfilled, (state, action) => {
//         state.posts = action.payload;
//       })
//       // .addCase(_likeComment.fulfilled, (state, action) => {
//       //   return "success"
//       // })
//       // .addCase(_unlikeComment.fulfilled, (state, action) => {
//       //   return "success"
//       // })
//       .addCase(_getLessons.pending, (state, action) => {
//         state.lessonLoading = true;
//       })
//       .addCase(_getLessons.fulfilled, (state, action) => {
//         state.lessons = action.payload;
//         state.lessonLoading = false;
//       })
//       .addCase(_getLessons.rejected, (state, action) => {
//         state.lessonLoading = false;
//       })
//       .addCase(fetchMyFollowings.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(fetchMyFollowings.fulfilled, (state, action) => {
//         state.myFollowers = action.payload.res1?.data?.results;
//         state.myFollowings = action.payload.res?.data?.results;
//         state.loading = false;
//       })
//       .addCase(fetchMyFollowings.rejected, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(_getBids.pending, (state, action) => {
//         state.bidLoading = true;
//       })
//       .addCase(_getBids.fulfilled, (state, action) => {
//         state.bids = action.payload;
//         state.bidLoading = false;
//       })
//       .addCase(_getBids.rejected, (state, action) => {
//         state.bidLoading = false;
//       })
//       .addCase(_getOutgoingBids.pending, (state, action) => {
//         state.bidLoading = true;
//       })
//       .addCase(_getOutgoingBids.fulfilled, (state, action) => {
//         if (action?.meta?.arg?.id) {
//           state.bidDetails = action.payload;
//         } else {
//           state.outgoingBids = action.payload;
//         }
//         state.bidLoading = false;
//       })
//       .addCase(_getOutgoingBids.rejected, (state, action) => {
//         state.bidLoading = false;
//       })
//       .addCase(_getBlockedUsers.fulfilled, (state, action) => {
//         state.blockedUsers = action.payload;
//       })
//       .addCase(_getTotalStatics.pending, (state, action) => {
//         state.staticsLoading = true;
//       })
//       .addCase(_getTotalStatics.fulfilled, (state, action) => {
//         state.statics = action.payload;
//         state.staticsLoading = false;
//       })
//       .addCase(_getTotalStatics.rejected, (state, action) => {
//         state.staticsLoading = false;
//       })
//       .addCase(_getPostStatics.pending, (state, action) => {
//         state.staticsLoading = true;
//       })
//       .addCase(_getPostStatics.fulfilled, (state, action) => {
//         state.postStatics = action.payload;
//         state.staticsLoading = false;
//       })
//       .addCase(_getPostStatics.rejected, (state, action) => {
//         state.staticsLoading = false;
//       });
//   },
// });

// export const {numberToScrollFun, isRecipeButtonVisibleFun, setBidDetails , setPostDislike , setPostLike, setRecipeModalData, setHomePostsData, setCountryListData, setCountryPostListModal, setModalCommentData, setOtherUserData, setFeedVisibleVideo, setFeedVisibleVideoTime, setPostsHeight} =
//   userSlice.actions;

// export default userSlice.reducer;
