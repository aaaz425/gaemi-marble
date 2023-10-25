package codesquad.gaemimarble.game.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class GameEventResultRequest {
	private Long gameId;
	private String eventName;

	@Builder
	private GameEventResultRequest(Long gameId, String eventName) {
		this.gameId = gameId;
		this.eventName = eventName;
	}
}