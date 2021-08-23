module.exports = function solveSudoku(matrix) {
	const SIZE = 9;
	const SECTOR = 3;

	const findEmpty = ( matrix ) => {
		for ( let r = 0; r < SIZE; r++ ) {
			for ( let c = 0; c < SIZE; c++  ) {
				if (matrix[r][c] === 0 ) {
					return [r, c];
				}
			}
		}
		return null;
	}

	const valid = ( num, pos, matrix ) => {
		const [ r, c ] = pos;

		// rows
		for ( const i in matrix ) {
			if ( matrix[i][c] === num && i !== r ) {
				return false;
			}
		}

		// cols
		for ( const i in matrix ) {
			if ( matrix[r][i] === num && i !== c ) {
				return false;
			}
		}

		// sector
		const sectorRow = Math.floor ( r / SECTOR ) * SECTOR;
		const sectorCol = Math.floor ( c / SECTOR ) * SECTOR;

		for ( let i = sectorRow; i < sectorRow + SECTOR; i++ ) {
			for ( let j = sectorCol; j < sectorCol + SECTOR; j++ ) {
				if ( matrix[i][j] === num && i !== r && j !== c ) {
					return false;
				}
			}
		}

		return true;
	}

	const solve = () => {
		const currentPos = findEmpty ( matrix );

		if ( currentPos === null ) {
			return true;
		}

		for ( let i = 1; i <= SIZE; i++ ) {
			const currentNum = i;
			const isValid = valid ( currentNum, currentPos, matrix );

			if ( isValid ) {
				const [ x, y ] = currentPos;
				matrix[x][y] = currentNum;

				if ( solve () ) {
					return true;
				}

				matrix[x][y] = 0;
			}
		}
		return false;
	}

	solve ();
	return matrix;
}
