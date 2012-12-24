$(function() {
  console.log('yes"');
  $('pre:has(code)').each(function() {
    $(this).css('border', '1px solid red');
    console.log(this);
  });
});