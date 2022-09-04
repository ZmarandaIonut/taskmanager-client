import {api} from "../emptySplitApi";

export const boardMembers = api.injectEndpoints({
	endpoints: (builder) => ({
        getBoardMembers: builder.query({
            query: ({slug, page}) => ({
                url: `/get-board-members/${slug}?page=${page}`,
             }),
        }),
	}),
});

export const {useGetBoardMembersQuery} = boardMembers;