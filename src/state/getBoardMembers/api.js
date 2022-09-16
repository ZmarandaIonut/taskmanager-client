import {api} from "../emptySplitApi";

export const boardMembers = api.injectEndpoints({
	endpoints: (builder) => ({
        getBoardMembers: builder.query({
            query: ({slug, page, search}) => ({
                url: search && search.length ? `/get-board-members/${slug}?search=${search}` :  `/get-board-members/${slug}?page=${page}`,
             }),
             providesTags: ["BoardMembers"]
        }),
	}),
});

export const {useGetBoardMembersQuery} = boardMembers;