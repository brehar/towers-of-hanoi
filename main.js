'use strict';

var originalTower;
var pieceSelected = false;
var numDisks = 4;
var allowedExtraMoves = 5;
var moves = Math.pow(2, numDisks) - 1 + allowedExtraMoves;

$(document).ready(init);

function init() {
	$('.tower').on('click', movePiece);
	$('#submit').on('click', changeDisks);
}

function movePiece() {
	if (!pieceSelected) {
		$(this).children().first().addClass('selected');

		originalTower = $(this).attr('id');
		pieceSelected = true;
	} else {
		var $pieceChosen = $('.selected');

		if ($(this).attr('id') !== originalTower) {
			var $topPiece = $(this).children().first();

			if ($topPiece.width() === null || $topPiece.width() > $pieceChosen.width()) {
				$(this).prepend($pieceChosen);

				moves--;
				$('#moves').text(moves);

				checkLose();
				adjustSizes();
			}
		}

		$pieceChosen.removeClass('selected');

		pieceSelected = false;
	}

	checkWin();
}

function changeDisks(event) {
	event.preventDefault();
	
	numDisks = $('#number').val();
	
	var htmlStr = '';

	for (var x = 1; x <= numDisks; x++) {
		htmlStr += '<div class="piece" id="piece' + x + '"></div>';
	}

	$('#tower1').html(htmlStr);

	moves = Math.pow(2, numDisks) - 1 + allowedExtraMoves;

	$('#moves').text(moves);

	adjustSizes();
}

function adjustSizes() {
	for (var x = 1; x < 4; x++) {
		$('#tower' + x).children().css('top', 300 - 15 * $('#tower' + x).children().length);
	}
}

function checkLose() {
	if (moves <= 0) {
		$('.lose').fadeIn();
		$('.tower').off('click');
	}
}

function checkWin() {
	if ($('#tower2').children().length === 0 && $('#tower1').children().length === 0) {
		$('.win').fadeIn();
		$('.tower').off('click');
	}
}