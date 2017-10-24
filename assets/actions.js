var tStart = 0 // Start transition from top
  , tEnd = 3277   // End at 500px
  , cStart = [66, 66, 132]// [255, 99, 71]  // Gold
  , cEnd = [80, 80, 80]// [66, 66, 132]   // Lime
  , cDiff = [cEnd[0] - cStart[0], cEnd[1] - cStart[1], cEnd[1] - cStart[0]];

$(document).ready(function(){
    $(document).scroll(function() {
        var p = ($(this).scrollTop() - tStart) / (tEnd - tStart); // % of transition
        p = Math.min(1, Math.max(0, p)); // Clamp to [0, 1]
        var cBg = [Math.round(cStart[0] + cDiff[0] * p), Math.round(cStart[1] + cDiff[1] * p), Math.round(cStart[2] + cDiff[2] * p)];
        $("body").css('background-color', 'rgb(' + cBg.join(',') +')');
    });
});
