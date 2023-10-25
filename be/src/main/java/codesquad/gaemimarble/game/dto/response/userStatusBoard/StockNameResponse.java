package codesquad.gaemimarble.game.dto.response.userStatusBoard;

import lombok.Builder;

public class StockNameResponse {
	private final String name;

	@Builder
	private StockNameResponse(String name) {
		this.name = name;
	}
}
