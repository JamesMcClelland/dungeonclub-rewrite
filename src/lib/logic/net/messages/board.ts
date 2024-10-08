import type { Position } from '$lib/compounds';
import type { BoardSnippet, TokenSnippet } from '../snippets';
import type {
	DefinePrivateRequest,
	DefineRequestWithPublicResponse,
	DefineSendAndForward,
	UUID
} from './messages';

export interface BoardMessageCategory {
	boardEdit: DefinePrivateRequest<
		{
			id: UUID;
		},
		BoardSnippet
	>;

	boardPlay: DefineRequestWithPublicResponse<
		{
			id: UUID;
		},
		BoardSnippet
	>;

	tokenCreate: DefineRequestWithPublicResponse<
		{
			boardId: UUID;
			tokenTemplate: UUID;
			position: Position;
		},
		TokenSnippet
	>;

	tokenMove: DefineSendAndForward<{
		id: UUID;
		position: Position;
	}>;
}
