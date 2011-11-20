var tools = {  

									/**
									 * Change size, blur and color of the text inside an element
									 * 
									 * @param elem String
									 * 		Either tagname id or class of the element(s) to be affected
									 * 		jQuery dependencies, so tag = "p", id = "#p" and class = ".p"
									 * @return String
									 * 		Returns a string representing the actual css set, I.E. 
									 * 		"text-shadow: Xpx Xpx Xpx hsl(XX, XX%, XX%)"
									 */
		changeTextShadow :			function(elem){
						
										var left 	= $('#sideAdjust').val() - 100
										  , top		= $('#topAdjust').val() - 100
										  , blur	= $('#blurAdjust').val()
										  , hue		= $('#hueAdjust').val()
										  , sat		= $('#saturationAdjust').val()
										  , bright	= $('#brightnessAdjust').val();
										
										$(elem).css("text-shadow", left + 'px ' + top + 'px ' + blur + 'px hsl(' + hue + ', ' + sat + '%, ' + bright + '%)');
										
										return "text-shadow: " + left + 'px ' + top + 'px ' + blur + 'px hsl(' + hue + ', ' + sat + '%, ' + bright + '%)';
									},

									/**
									 * Set the color of text in a hsl value, on the supplied element
									 * 
									 * @param elem String
									 * 		Either tagname id or class of the element(s) to be affected
									 * 		jQuery dependencies, so tag = "p", id = "#p" and class = ".p"
									 * @return String
									 * 		Returns a string representing the actual css set, I.E. 
									 * 		"color: hsl(XX, XX%, XX%)"
									 */
		changeTextColor	: 			function(elem){
										var hue		= $('#textHueAdjust').val()
										  , sat		= $('#textSaturationAdjust').val()
										  , bright	= $('#brightnessAdjust').val();

										$(elem).css("color", 'hsl(' + hue + ', ' + sat + '%, ' + bright + '%)');
										
										return 'color: hsl(' + hue + ', ' + sat + '%, ' + bright + '%)';
									},

									/**
									 * A console.log wrapper just to make sure we dont get js-errors that break our page
									 * just because console.log is not supported by current browser
									 * 
									 * I.E., if console log is *NOT* supported, do nothing with our log gmessages
									 * 
									 */
		log 						: function(arg){
										if(console !== undefined && console.log !== undefined) {
											console.log(arg);
										}
									}
}