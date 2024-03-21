export default () => {
  const { origin } = window.location;
  const ablyAsciiArt =
    ' ______  __       ___\n' +
    '/+  _  +/+ +     /+_ +\n' +
    '+ + +L+ + + +____+//+ +    __  __\n' +
    " + +  __ + + '__`+ + + +  /+ +/+ +\n" +
    '  + + +/+ + + +L+ + +_+ +_+ + +_+ +\n' +
    '   + +_+ +_+ +_,__/ /+____++/`____ +\n' +
    '    +/_/+/_/+/___/  +/____/ `/___/> +\n' +
    '                               /+___/\n' +
    '                               +/__/\n';

  window.console.log(
    [
      ablyAsciiArt.replace(/\+/g, '\\'),
      'Interested in solving hard distributed and realtime problems, at scale?',
      `We're looking for great people to join us. See ${origin}/careers`,
      `And we're looking for expert freelancers. See ${origin}/experts-network`,
    ].join('\n'),
  );
};
