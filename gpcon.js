/* 
 Copyright 2017 Brian "Beej Jorgensen" Hall <beej@beej.us>
 Copyright 2020 4aiman @ github.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

// "globals"

// list all available styles
let available_styles = ['DS', 'NES', 'SNES', 'XBOX']

// get stored style
let current_style	= localStorage.getItem("gpcon_style") || "NES"
let darkmode		= localStorage.getItem("darkmode")
let buttons_border	= localStorage.getItem("show_buttons_border")
let cbr 			= localStorage.getItem("cbr")
let cbg 			= localStorage.getItem("cbg")
let cbb 			= localStorage.getItem("cbb")
let cba 			= localStorage.getItem("cba")
let clr 			= localStorage.getItem("clr")
let clg 			= localStorage.getItem("clg")
let clb 			= localStorage.getItem("clb")
let cla 			= localStorage.getItem("cla")

if (darkmode == null) {
	darkmode = true
} else {
	darkmode = JSON.parse(darkmode)
}

if (buttons_border == null) {
	buttons_border = true
} else {
	buttons_border = JSON.parse(buttons_border)
}

// iterate over supported styles, check if the saved one is correct
let style_defined = false
for (let style of available_styles) {
	if (style == current_style) {
		style_defined = true
		break
	}
}


// default to 1st style if thre's something wrong with the setting
if (!style_defined) {
	current_style=available_styles[0]
}

// called upon page loading
function prep() {
	let page = document.getElementsByTagName("body")[0]	
	let controls = document.getElementById("controls")
	let color_base_div = document.getElementById("color_base")
	let color_lines_div = document.getElementById("color_lines")

	let border_box = document.getElementById("border_box")
	let buttons_border_element = document.getElementById("buttons_border")
	border_box.addEventListener("change", border_box_change) 
		function border_box_change(event) {			
			let show_buttons_border = border_box.checked
			if (show_buttons_border){
				buttons_border_element.style.border = "1px solid red"
			} else {
				buttons_border_element.style.border = "1px solid transparent"
			}
			localStorage.setItem("show_buttons_border", show_buttons_border)
		}

	let darkmode_box = document.getElementById("darkmode_box")		
		darkmode_box.addEventListener("change", darkmode_change) 
		function darkmode_change(event) {			
			let darkmode = darkmode_box.checked
			if (darkmode) {
				page.style.background = "rgba(0, 0, 0, 1)"	
				controls.style.color = "white"
				color_base_div.style.borderColor = "white"
				color_lines_div.style.borderColor = "white"
				base_color = "rgba(0,0,0,1)"
				line_color = "rgba(255,255,255,1)"
				document.documentElement.style.setProperty(`--bbm`, "normal")
			} else {
				page.style.background = "rgba(255, 255, 255, 1)"
				controls.style.color = "black"
				color_base_div.style.borderColor = "black"
				color_lines_div.style.borderColor = "black"
				base_color = "rgba(255,255,255,1)"
				line_color = "rgba(0,0,0,1)"				
				document.documentElement.style.setProperty(`--bbm`, "difference")
			}
			localStorage.setItem("darkmode", darkmode)
		}


	let red_slider_base = document.getElementById("red_slider_base")
	let green_slider_base = document.getElementById("green_slider_base")
	let blue_slider_base = document.getElementById("blue_slider_base")
	let alpha_slider_base = document.getElementById("alpha_slider_base")
	let red_input_base = document.getElementById("red_input_base")
	let green_input_base = document.getElementById("green_input_base")
	let blue_input_base = document.getElementById("blue_input_base")
	let alpha_input_base = document.getElementById("alpha_input_base")
		red_slider_base.addEventListener("input", base_color_change) 
		green_slider_base.addEventListener("input", base_color_change) 
		blue_slider_base.addEventListener("input", base_color_change) 
		alpha_slider_base.addEventListener("input", base_color_change) 
		function base_color_change() {			
			let r = red_slider_base.value
			let g = green_slider_base.value
			let b = blue_slider_base.value
			let a = alpha_slider_base.value/100			

			let rgba = "rgba("+r+","+g+","+b+","+a+")"
			color_base_div.style.background = rgba	
			red_input_base.value = r
			green_input_base.value = g
			blue_input_base.value = b
			alpha_input_base.value = a
			document.documentElement.style.setProperty(`--cbr`, r);
			document.documentElement.style.setProperty(`--cbg`, g);
			document.documentElement.style.setProperty(`--cbb`, b);
			document.documentElement.style.setProperty(`--cba`, a);
			localStorage.setItem("cbr",r)
			localStorage.setItem("cbg",g)
			localStorage.setItem("cbb",b)
			localStorage.setItem("cba",a*100)
		}

	
	let red_slider_lines = document.getElementById("red_slider_lines")
	let green_slider_lines = document.getElementById("green_slider_lines")
	let blue_slider_lines = document.getElementById("blue_slider_lines")
	let alpha_slider_lines = document.getElementById("alpha_slider_lines")
	let red_input_lines = document.getElementById("red_input_lines")
	let green_input_lines = document.getElementById("green_input_lines")
	let blue_input_lines = document.getElementById("blue_input_lines")
	let alpha_input_lines = document.getElementById("alpha_input_lines")
		red_slider_lines.addEventListener("input", lines_color_change) 
		green_slider_lines.addEventListener("input", lines_color_change) 
		blue_slider_lines.addEventListener("input", lines_color_change) 
		alpha_slider_lines.addEventListener("input", lines_color_change) 
		function lines_color_change() {			
			let r = red_slider_lines.value
			let g = green_slider_lines.value
			let b = blue_slider_lines.value
			let a = alpha_slider_lines.value/100
			let rgba = "rgba("+r+","+g+","+b+","+a+")"
			color_lines_div.style.background = rgba			
			red_input_lines.value = r
			green_input_lines.value = g
			blue_input_lines.value = b
			alpha_input_lines.value = a
			document.documentElement.style.setProperty(`--clr`, r);
			document.documentElement.style.setProperty(`--clg`, g);
			document.documentElement.style.setProperty(`--clb`, b);
			document.documentElement.style.setProperty(`--cla`, a);
			localStorage.setItem("clr",r)
			localStorage.setItem("clg",g)
			localStorage.setItem("clb",b)
			localStorage.setItem("cla",a*100)
		}

	// gets style select element that controls the stylesheets

	let DS_option = document.getElementById("DS_option")
	let NES_option = document.getElementById("NES_option")
	let SNES_option = document.getElementById("SNES_option")
	let XBOX_option = document.getElementById("XBOX_option")
		DS_option.addEventListener("click", style_change)
		NES_option.addEventListener("click", style_change)
		SNES_option.addEventListener("click", style_change)
		XBOX_option.addEventListener("click", style_change)
	
	// this changes style by deleting an old <link> element and creating a new one
	function style_change(event) {
		let head = document.getElementsByTagName( "head" )[0]
		
		for (let child of head.children) {
			if (child.tagName == "LINK") {
				delete child
			}
		}

		let link = document.createElement('link')
		link.href = event.srcElement.value + ".css"
		link.rel = "stylesheet"
		head.appendChild(link)
		current_style = event.srcElement.value
		localStorage.setItem("gpcon_style",event.srcElement.value) // remember to save selected style
	}

	document.getElementById(current_style+"_option").click()
	//style_change({srcElement: style_select.children[idx]})

	red_slider_base.value = cbr
	green_slider_base.value = cbg
	blue_slider_base.value = cbb
	alpha_slider_base.value = cba
	
	red_slider_lines.value = clr
	green_slider_lines.value = clg
	blue_slider_lines.value = clb
	alpha_slider_lines.value = cla

	darkmode_box.checked = darkmode
	border_box.checked = buttons_border

	base_color_change()
	lines_color_change()
	darkmode_change()
	border_box_change()


}


function consent(){
	let gamepads = navigator.getGamepads();
	console.log(gamepads)
}


let buttons = []; // remembers if button was added
let axes = [];    // remembers if axis was added (separate X and Y values)
let axes_c = [];  // remembers if axis box was added (combines X and Y of one stick)
let l_stick = 10; // L3 button id (change this to ID of L3 button and it will appear as the left stick)
let r_stick = 11; // R3 button id (change this to ID of R3 button and it will appear as the right stick)

function onFrame() {                             // gets repeatedly executed
	let gamepads = navigator.getGamepads();      // this gets *all* gamepads that your browser was able to detect
	                                             // note: gamepad may stay undetected until you press a button on it
	let gp = gamepads[0];                        // we start with the 1st gamepad

	if (!gp) {                                   // but browsers can detect some NULL devices, so we check if there's really something
		for (i = 0; i < gamepads.length; i++) {  // cycling and checking every other gamepad seems good enough 	 
			gp = gamepads[i];                    // we get a gemapad
			if (!gp) {                           // and if there's nothing
				continue;                        // we check the next one
			} else {
				break;                           // but if there's a gamepad, we stop and work with what we just got
			}
		}	
	}                                            

	if (!gp) {                                   // in case all gamepads are NULL, we just start over  
		requestAnimationFrame(onFrame); 
		return;
	}

	if (typeof gp === "undefined") {                     // seems unnecessary, but hey, we need to be sure a gamepad exists  
	} else {                                             // at this point gamepad is properly detected
		gp.mapping = "standard"
		let buttdiv = document.getElementById('buttons')  // so, we get our container element (see index.html) and add 'buttons' to it
		for (j = 0; j < gp.buttons.length; j++) {         // we cycle through all detected buttons and add those to a 'buttons' array
            if (typeof buttons[j] === "undefined") {     // if jth button isn't added yet, we will do just that
			    if (j>16) {continue;}                    // just be sure to skip weird non-existing buttons on your gamepad (PS3 Dualshock here)
				if (j==l_stick || j==r_stick) continue;  // we also need to skip sticks to add those later (if your gamepad doesn't have 'pressable' sticks - comment this line)

                let buttEle = document.createElement('span'); // create a new element (a button)
			    buttEle.classList.add('button');              // set it's class to 'button', so css can kick in
				buttEle.classList.add('button_'+j)			  // set additional class to allow customization via css
				buttEle.setAttribute("id",'button_'+j)		  // set new button's ID so we can get it later and change it's style
				buttdiv.appendChild(buttEle);                 // add newly created button to the 'container'
				
				buttons[j] = true; // // for now all we need is to remember the fact that jth button has been added
			   
             } else {                                               // this part kick in when jth button has been added already
				let buttEle = document.getElementById('button_'+j); // we get correnponding element in our HTML document
				let val = gp.buttons[j].value;                      // val keeps the value browser got from jth button (can be 0, 1 or smth in-between for analogue buttons)
			    if (gp.buttons[j].pressed) { // if current button is pressed we can alter it's style
					if (j==8) {
						if (current_style == "DS") {
							buttEle.style.background='rgba(255,255,255, 0.7)';
							buttEle.innerHTML = ""
						} else if (current_style == "SNES") {
							buttEle.style.background='rgba(255,225,225, 0.7)';
							buttEle.innerHTML = ""
						} else if (current_style == "NES") {
							buttEle.style.background='rgba(255,255,255, 0.7)';
							buttEle.innerHTML = ""
						} else if (current_style == "XBOX") {
							buttEle.style.background='rgba(255,255,255,0)';
							buttEle.innerHTML = '<svg class="svg_button" id="button_8" select style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)"  d="M 160 194 C 148 194 146 206 160 208 C 170 208 174 196 160 194 Z M 162 198 L 154 202 L 162 206 L 162 198 Z"></path></svg>';
						}
					} else if (j==9) { // the 'start' button (as well as any other non-round-shaped button) has to have it's innerHTML rewritten
						if (current_style == "DS") {
							buttEle.innerHTML = '<svg class="svg_button" id="button_9_border"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" points="0,0 30,9 1,18 1,0"></polygon></svg>';
						} else if (current_style == "SNES") {
							buttEle.style.background='rgba(255,255,255, 0.7)';
							buttEle.innerHTML = ""
						} else if (current_style == "NES") {
							buttEle.style.background='rgba(255,255,255, 0.7)';
							buttEle.innerHTML = ""
						} else if (current_style == "XBOX") {
							buttEle.style.background='rgba(255,255,255,0)';
							buttEle.innerHTML = '<svg class="svg_button" id="button_9" start style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 240 194 C 228 194 228 208 240 208 C 250 208 256 194 240 194 Z M 238 198 L 238 206 L 246 202 Z"></path></svg>';
						}
					} else { // sure, this could've been coded better, but what the heck, it works
						if (j<=11) { // buttons with id lower that 12 are usually the round-shaped ones; on-stick buttons go here as well					    
							if (current_style == "DS") {
								buttEle.style.background='linear-gradient(to top, rgba(255,255,255,0.5) '+val*100+'%, rgba(170,70,70,0.5) '+val*100+'%)';// gradient really helps to visualize partial presses
							} else {
								buttEle.style.background='rgba(255, 255, 255, 0.75)';
							}
							buttEle.innerHTML = ""
							if (j==0) {
								if (current_style == "XBOX") {							
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_0" cross style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 308 216 C 294 216 294 236 310 234 C 322 234 328 214 308 216 Z "></path></svg>'
								}
							}
							if (j==1) {
								if (current_style == "XBOX") {							
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_1" circle style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 338 190 C 324 196 328 212 344 208 C 354 204 358 186 338 190 Z "></path></svg>'
								}
							}
							if (j==2) {
								if (current_style == "XBOX") {							
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_2" square style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 280 193 C 262 196 270 212 282 210 C 300 208 292.5 190.9 280 193 Z"></path></svg>'
								}
							}
							if (j==3) {
								if (current_style == "XBOX") {							
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_3" triangle style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 308 166 C 296 172 300 192 316 186 C 330 182 326 160 308 166 Z"></path></svg>'
								}
							}
							if (j==4) {//L1
								if (current_style == "DS") {
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									//buttEle.innerHTML = '<svg class="svg_button" L1 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><linearGradient id="GradientBL1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="rgba(250,250,250,0.5)"/><stop offset="'+val+'" stop-color="rgba(170,70,70,0.5)"/></linearGradient><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,1)" fill="url(#GradientBL1)" d="M 120 138 L 122 124 C 120 122 116 124 114 118 C 92 118 82 118 58 130 L 52 138 L 52 148 C 72 142 86 132 120 138 Z "></path></svg>'
									buttEle.innerHTML = '<svg class="svg_button" id="button_4" L1 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 120 138 L 122 124 C 120 122 116 124 114 118 C 92 118 82 118 58 130 L 52 138 L 52 148 C 72 142 86 132 120 138 Z "></path></svg>'
								}
							}
							if (j==6) {//L2
								if (current_style == "DS") {
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									//buttEle.innerHTML = '<svg class="svg_button" L2 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,1)" fill="rgba(250,250,250,0.25)" d="M 86 120 C 94 118 102 118 110 118 L 110 92 C 112 90 96 82 88 92 L 86 120 Z"></path></svg>'
									buttEle.innerHTML = '<svg class="svg_button" id="button_6" L2 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><linearGradient id="GradientBL2" x1="0" x2="0" y1="0" y2="1"><stop offset="'+val+'" stop-color="rgba(250,250,250,0.75)"/><stop offset="'+val+'" stop-color="rgba(var(--cbr), var(--cbg), var(--cbb), var(--cba))"/></linearGradient><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="url(#GradientBL2)" d="M 86 118 C 94 118 102 118 110 118 L 110 92 C 112 90 96 82 88 92 L 86 120 Z"></path></svg>'
								}
							}
							if (j==5) {//R1
								if (current_style == "DS") {
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									//buttEle.innerHTML = '<svg class="svg_button" L1 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><linearGradient id="GradientBL1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="rgba(250,250,250,0.5)"/><stop offset="'+val+'" stop-color="rgba(170,70,70,0.5)"/></linearGradient><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,1)" fill="url(#GradientBL1)" d="M 120 138 L 122 124 C 120 122 116 124 114 118 C 92 118 82 118 58 130 L 52 138 L 52 148 C 72 142 86 132 120 138 Z "></path></svg>'
									buttEle.innerHTML = '<svg class="svg_button" id="button_5" R1 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 278 124 C 282 124 282 118 286 118 C 308 116 322 120 342 132 L 346 138 L 346 148 C 326 140 302 130 278 138 L 278 124 Z "></path></svg>'
								}
							}
							if (j==7) {//R2
								if (current_style == "DS") {
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									//buttEle.innerHTML = '<svg class="svg_button" L2 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,1)" fill="rgba(250,250,250,0.25)" d="M 86 120 C 94 118 102 118 110 118 L 110 92 C 112 90 96 82 88 92 L 86 120 Z"></path></svg>'
									buttEle.innerHTML = '<svg class="svg_button" id="button_7" R2 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><linearGradient id="GradientBR2" x1="0" x2="0" y1="0" y2="1"><stop offset="'+val+'" stop-color="rgba(255,255,255,0.75)"/><stop offset="'+val+'" stop-color="rgba(255,255,255, var(--cba))"/></linearGradient><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="url(#GradientBR2)" d="M 290 118 C 298 116 308 118 316 120 L 312 92 C 304 82 288 90 290 92 L 290 118 Z"></path></svg>'
								}
							}
							if (j==10) {//L3
								if (current_style == "DS") {
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_10" L3  style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75" d="M 76 194 C 46 212 76 240 98 230 C 126 214 106 184 76 194 Z "></path></svg>'
								}
							}
							if (j==11) {//R3
								if (current_style == "DS") {
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_11" R3 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75" d="M 236 252 C 210 274 246 290 260 284 C 294 268 262 238 236 252 Z "></path></svg>'
								}
							}
						}
						if (current_style == "DS") {
							if (j==12) {// up
								buttEle.innerHTML = '<svg class="svg_button" id="button_12" height="25" width="25" transform="rotate(0)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
							}
							if (j==13) {// down
								buttEle.innerHTML = '<svg class="svg_button" id="button_13" height="25" width="25" transform="rotate(180)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
							}
							if (j==14) {// left
								buttEle.innerHTML = '<svg class="svg_button" id="button_14" height="25" width="25" transform="rotate(270)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
							}
							if (j==15) {// right
								buttEle.innerHTML = '<svg class="svg_button" id="button_15" height="25" width="25" transform="rotate(90)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
							}
						} else if (current_style == "SNES") {
							if (j==12) {// up
								buttEle.innerHTML = '<svg class="svg_button" id="button_12" height="25" width="25" transform="rotate(0)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" points="3,16 11,3 19,16"></polygon></svg>';								
							}
							if (j==13) {// down
								buttEle.innerHTML = '<svg class="svg_button" id="button_12" height="25" width="25" transform="rotate(180)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" points="3,16 11,3 19,16"></polygon></svg>';								
							}
							if (j==14) {// left
								buttEle.innerHTML = '<svg class="svg_button" id="button_12" height="25" width="25" transform="rotate(270)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" points="3,16 11,3 19,16"></polygon></svg>';								
							}
							if (j==15) {// right
								buttEle.innerHTML = '<svg class="svg_button" id="button_12" height="25" width="25" transform="rotate(90)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" points="3,16 11,3 19,16"></polygon></svg>';								
							}
						} else if (current_style == "NES") {
							if (j==12) {// up
								buttEle.innerHTML = '<svg class="svg_button" id="button_12" height="25" width="25" transform="rotate(0)"><path fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 2 14 L 2 8 L 0 8 L 8 0 L 16 8 L 14 8 L 14 14 Z"></path></svg>';
							}
							if (j==13) {// down
								buttEle.innerHTML = '<svg class="svg_button" id="button_13" height="25" width="25" transform="rotate(180)"><path fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 2 14 L 2 8 L 0 8 L 8 0 L 16 8 L 14 8 L 14 14 Z"></path></svg>';								
							}
							if (j==14) {// left
								buttEle.innerHTML = '<svg class="svg_button" id="button_14" height="25" width="25" transform="rotate(270)"><path fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 2 14 L 2 8 L 0 8 L 8 0 L 16 8 L 14 8 L 14 14 Z"></path></svg>';								
							}
							if (j==15) {// right
								buttEle.innerHTML = '<svg class="svg_button" id="button_15" height="25" width="25" transform="rotate(90)"><path fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.75)" d="M 2 14 L 2 8 L 0 8 L 8 0 L 16 8 L 14 8 L 14 14 Z"></path></svg>';
							}
						} else if (current_style == "XBOX") {
							if (j==12) {// up
								buttEle.innerHTML = '<svg class="svg_button" up style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,0)" fill="rgba(255,255,255,  0.75)" d="M 136 238 C 140 236 146 236 150 238 C 152 242 152 248 154 250 C 144 256 140 256 132 250 C 134 248 134 240 136 238 Z"></path></svg>';
							}
							if (j==13) {// down
								buttEle.innerHTML = '<svg class="svg_button" down style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,0)" fill="rgba(255,255,255, 0.75)" d="M 152 280 C 148 282 144 282 138 280 C 134 276 136 270 132 268 C 140 264 148 264 156 268 C 154 270 152 276 152 280 Z "></path></svg>';
							}
							if (j==14) {// left
								buttEle.innerHTML = '<svg class="svg_button" left style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,0)" fill="rgba(255,255,255, 0.75)"  d="M 116 254 C 114 258 114 262 118 266 C 122 266 126.6667 265.3333 132 268 C 136 262 136 258 132 250 C 126.6667 252.6667 121.3333 253.3333 116 254 C 116 254 116 254 116 254 Z"></path></svg>';
							}
							if (j==15) {// right
								buttEle.innerHTML = '<svg class="svg_button" style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,0)" fill="rgba(255,255,255, 0.75)" d="M 170 254 C 172 258 172 262 170 266 C 165.3333 266 160.6667 266 156 268 C 152 262 152 256 154 250 C 159.3333 252.6667 164.6667 253.3333 170 254 Z "></path></svg>';
							}
							if (j==16) {//home
								if (current_style == "XBOX") {
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" home style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(255,255,255, 0.5)" d="M 196 182 C 172 186 166 216 202 218 C 226 216 234 182 196 182 Z"></path><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,0)" fill="rgba(255,255,255, var(--cba))" d="M 196 182 C 172 186 166 216 202 218 C 226 216 234 182 196 182 Z M 208 186 C 208 186 202 192 200 194 C 196.6667 190.6667 194 190 190 186 C 196 182 202 184 208 186 Z M 204 196 C 206 193.3333 208 190.6667 210 188 C 220 192 218 204 214 208 C 212 204 207.3333 200 204 196 Z M 200 200 C 204 202 210 206 212 210 C 204 216 194 214 188 210 C 192 206 196 202 200 200 Z M 196 196 C 191.3333 200 188.6667 204 186 208 C 176 200 184 192 188 188 C 190 190 192 190 196 196 Z"></path></svg>'
								}
							}
						}
					}
				} else {  // if current button is *not* pressed we should revert it's style					
					if (j==8) {
						if (current_style == "DS") {
							buttEle.style.background='rgba(255,255,255, 0)';
							buttEle.style['background-image'] = "linear-gradient(to bottom, rgba(190,190,190,0.25) 0%, rgba(50,50,50,0.25) 100%), linear-gradient(to right, rgba(190,190,190,0.25) 0%, rgba(50,50,50,0.25) 100%)";							
						} else if (current_style == "SNES") {
							buttEle.style.background='rgba(0,0,0,0.0)';
							buttEle.innerHTML = ""
						} else if (current_style == "NES") {
								buttEle.style.background='rgba(0,0,0,0)';
								buttEle.innerHTML = ""
						} else if (current_style == "XBOX") {
								buttEle.style.background='rgba(30,30,30,0)';
								buttEle.innerHTML = '';
						}
					} else if (j==9) {// once again, the 'start' button needs special attention
						if (current_style == "DS") {
							buttEle.style.background='rgba(0,0,0,0.0)';
							buttEle.innerHTML = '<svg class="svg_button" id="button_9_border"><linearGradient id="Gradient0" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="rgba(150,150,150,0.5)"/><stop offset="100%" stop-color="rgba(255,255,255, var(--cba))"/></linearGradient><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="url(#Gradient0)" points="0,0 30,9 1,18 1,0"></polygon></svg>';
						} else if (current_style == "SNES") {
							buttEle.style.background='rgba(0,0,0,0.0)';
							buttEle.innerHTML = ""
						} else if (current_style == "NES") {
							buttEle.style.background='rgba(30,30,30,0)';
							buttEle.innerHTML = ""
						} else if (current_style == "XBOX") {
							buttEle.style.background='rgba(30,30,30,0)';
							buttEle.innerHTML = ""
						}						
					} else {
						if (j<=11) { // round-shaped buttons can be processed similarly
							if (j==0) {
								if (current_style == "XBOX") {							
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = ''
								}
							}
							if (j==1) {
								if (current_style == "XBOX") {							
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = ''
								}
							}
							if (j==2) {
								if (current_style == "XBOX") {							
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = ''
								}
							}
							if (j==3) {
								if (current_style == "XBOX") {							
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = ''
								}
							}
							if (j==4) {//L1
								if (current_style == "DS") {
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {
		
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_4" L1 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(var(--cbr), var(--cbg), var(--cbb), var(--cba))" d="M 120 138 L 122 124 C 120 122 116 124 114 118 C 92 118 82 118 58 130 L 52 138 L 52 148 C 72 142 86 132 120 138 Z "></path></svg>'
								}
							}
							if (j==6) {//L2
								if (current_style == "DS") {
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_6" L2 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(var(--cbr), var(--cbg), var(--cbb), var(--cba))" d="M 86 120 C 94 118 102 118 110 118 L 110 92 C 112 90 96 82 88 92 L 86 120 Z"></path></svg>'
								}
							}
							if (j==5) {//R1
								if (current_style == "DS") {
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_5" R1 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(var(--cbr), var(--cbg), var(--cbb), var(--cba))" d="M 278 124 C 282 124 282 118 286 118 C 308 116 322 120 342 132 L 346 138 L 346 148 C 326 140 302 130 278 138 L 278 124 Z"></path></svg>'
								}
							}
							if (j==7) {//R2
								if (current_style == "DS") {
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_7" R2 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(var(--cbr), var(--cbg), var(--cbb), var(--cba))" d="M 290 118 C 298 116 308 118 316 120 L 312 92 C 304 82 288 90 290 92 L 290 118 Z"></path></svg>'
								}
							}
							if (j==10) {//L3
								if (current_style == "DS") {
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_10" L3  style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(var(--cbr), var(--cbg), var(--cbb), var(--cba))" d="M 76 194 C 46 212 76 240 98 230 C 126 214 106 184 76 194 Z "></path></svg>'
								}
							}
							if (j==11) {//R3
								if (current_style == "DS") {
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '';
								} else if (current_style == "XBOX") {

									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" id="button_11" R3 style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(var(--cbr), var(--cbg), var(--cbb), var(--cba))" d="M 236 252 C 210 274 246 290 260 284 C 294 268 262 238 236 252 Z "></path></svg>'
								}
							}

							if (current_style == "DS") {
								buttEle.style.background='rgba(70,70,70,0.5)';
								buttEle.style['background-image'] = "linear-gradient(to bottom, rgba(190,190,190,0.25) 0%, rgba(50,50,50,0.25) 100%), linear-gradient(to right, rgba(190,190,190,0.25) 0%, rgba(50,50,50,0.25) 100%)";							
							} else if (current_style == "SNES") {
								buttEle.style.background='rgba(0,0,0,0.0)';
								buttEle.innerHTML = ""
							} else if (current_style == "NES") {
								buttEle.style.background='rgba(0,0,0,0.0)';
								buttEle.innerHTML = ""
							} else if (current_style == "XBOX") {
								//buttEle.style.background='rgba(0,0,0,0.0)';
								//buttEle.innerHTML = ""
							}							
						}
						if (current_style == "DS") {
							if (j==12) { // and of course directional buttons: up
								buttEle.innerHTML = '<svg class="svg_button" id="button_12" height="25" width="25" transform="rotate(  0)"><linearGradient id="Gradient1" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="rgba(150,150,150,0.5)"/><stop offset="100%" stop-color="rgba(255,255,255, var(--cba))"/></linearGradient><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="url(#Gradient1)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
							}
							if (j==13) {// down
								buttEle.innerHTML = '<svg class="svg_button" id="button_13" height="25" width="25" transform="rotate(180)"><linearGradient id="Gradient2" x1="1" x2="0" y1="1" y2="0"><stop offset="0%" stop-color="rgba(150,150,150,0.5)"/><stop offset="100%" stop-color="rgba(255,255,255, var(--cba))"/></linearGradient><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="url(#Gradient2)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
							}
							if (j==14) {// left
								buttEle.innerHTML = '<svg class="svg_button" id="button_14" height="25" width="25" transform="rotate(270)"><linearGradient id="Gradient3" x1="1" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="rgba(150,150,150,0.5)"/><stop offset="100%" stop-color="rgba(255,255,255, var(--cba))"/></linearGradient><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="url(#Gradient3)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
							}
							if (j==15) {// right
								buttEle.innerHTML = '<svg class="svg_button" id="button_15" height="25" width="25" transform="rotate(90)"><linearGradient id="Gradient4" x1="0" x2="1" y1="1" y2="0"><stop offset="0%" stop-color="rgba(150,150,150,0.5)"/><stop offset="100%" stop-color="rgba(255,255,255, var(--cba))"/></linearGradient><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="url(#Gradient4)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
							}
						} else if (current_style == "SNES") {
							if (j==12) {// up
								buttEle.innerHTML = '<svg class="svg_button" id="button_12" height="25" width="25" transform="rotate(0)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(0,0,0,0)" points="3,16 11,3 19,16"></polygon></svg>';
							}
							if (j==13) {// down
								buttEle.innerHTML = '<svg class="svg_button" id="button_13" height="25" width="25" transform="rotate(180)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(0,0,0,0)" points="3,16 11,3 19,16"></polygon></svg>';								
							}
							if (j==14) {// left
								buttEle.innerHTML = '<svg class="svg_button" id="button_14" height="25" width="25" transform="rotate(270)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(0,0,0,0)" points="3,16 11,3 19,16"></polygon></svg>';								
							}
							if (j==15) {// right
								buttEle.innerHTML = '<svg class="svg_button" id="button_15" height="25" width="25" transform="rotate(90)"><polygon fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(0,0,0,0)" points="3,16 11,3 19,16"></polygon></svg>';
							}
						} else if (current_style == "NES") {
							if (j==12) {// up
								buttEle.innerHTML = '<svg class="svg_button" id="button_12" height="25" width="25" transform="rotate(0)"><path fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(0,0,0,0)" d="M 2 14 L 2 8 L 0 8 L 8 0 L 16 8 L 14 8 L 14 14 Z"></path></svg>';
							}
							if (j==13) {// down
								buttEle.innerHTML = '<svg class="svg_button" id="button_13" height="25" width="25" transform="rotate(180)"><path fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(0,0,0,0)" d="M 2 14 L 2 8 L 0 8 L 8 0 L 16 8 L 14 8 L 14 14 Z"></path></svg>';								
							}
							if (j==14) {// left
								buttEle.innerHTML = '<svg class="svg_button" id="button_14" height="25" width="25" transform="rotate(270)"><path fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(0,0,0,0)" d="M 2 14 L 2 8 L 0 8 L 8 0 L 16 8 L 14 8 L 14 14 Z"></path></svg>';								
							}
							if (j==15) {// right
								buttEle.innerHTML = '<svg class="svg_button" id="button_15" height="25" width="25" transform="rotate(90)"><path fill-rule="evenodd" stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(0,0,0,0)" d="M 2 14 L 2 8 L 0 8 L 8 0 L 16 8 L 14 8 L 14 14 Z"></path></svg>';
							}
						} else if (current_style == "XBOX") {
							if (j==12) {// up
								buttEle.innerHTML = '';
							}
							if (j==13) {// down
								buttEle.innerHTML = '';
							}
							if (j==14) {// left
								buttEle.innerHTML = '';
							}
							if (j==15) {// right
								buttEle.innerHTML = '';
							}
							if (j==16) {//home
								if (current_style == "XBOX") {
									buttEle.style.background='rgba(255,25,55,0)';
									buttEle.innerHTML = '<svg class="svg_button" home style="position: absolute; width: 400px; height: 400px; top: 0px; left: 0px;"><path style="transform:scale(1)" stroke-width=1 stroke="rgba(var(--clr), var(--clg), var(--clb), var(--cla))" fill="rgba(0,0,0,0)" d="M 196 182 C 172 186 166 216 202 218 C 226 216 234 182 196 182 Z"></path><path style="transform:scale(1)" stroke-width=1 stroke="rgba(0,0,0,0)" fill="rgba(255,255,255, var(--cba))" d="M 196 182 C 172 186 166 216 202 218 C 226 216 234 182 196 182 Z M 208 186 C 208 186 202 192 200 194 C 196.6667 190.6667 194 190 190 186 C 196 182 202 184 208 186 Z M 204 196 C 206 193.3333 208 190.6667 210 188 C 220 192 218 204 214 208 C 212 204 207.3333 200 204 196 Z M 200 200 C 204 202 210 206 212 210 C 204 216 194 214 188 210 C 192 206 196 202 200 200 Z M 196 196 C 191.3333 200 188.6667 204 186 208 C 176 200 184 192 188 188 C 190 190 192 190 196 196 Z"></path></svg>'
								}
							}
						}
					}
				}	
			}
		} // at this point we're done with the buttons
	   
		for (j = 0; j < gp.axes.length; j++) {    // all that is left is to process axes
			if (typeof axes[j] === "undefined") { // it's all the same for those except the need to 'combine' X and Y axes
				let b = (j)/2|0;                  // and here's why this 'b' is here: it will be incremented by 1 every other *even* j, thus enabling us to check for *pairs*
				if (!axes_c[b]) {				  // so, if current pair hasn't been registered yet - do it now	
                   let axisEle = document.createElement('div'); // this is a rounded box around the bth stick
			       axisEle.classList.add('axisbox');            // we can add a basic class for styling purposes
				   axisEle.classList.add('axisbox_'+b)          // and a separete unique class to fine-tune that styling (wish polymer did that)
				   buttdiv.appendChild(axisEle);                // finally add axes box to 'container'
				   
                   let buttEle = document.createElement('span');    // butons with l_stick and r_stick ids are being added here
			       buttEle.classList.add('button');                 // same treatments as the other buttons for class
				   buttEle.classList.add('button_'+(b+l_stick))	    // unique class
				   buttEle.setAttribute("id",'button_'+(b+l_stick)) // and id (needed not only to colorize, but to move around these ones)
				   axisEle.appendChild(buttEle);                    // and now to add these 'movable' buttons 
				   buttons[b+l_stick]=0;                            // also, remeber those buttons are there  				   
				   axes_c[b] = [0,0];				                // as well as those axes pairs
				}
				axes[j] = 0;                                        // aaannd separate axis
			} else {                                                             // now this is for moving 'sticks' around
				let b = (j)/2|0;			                                     // just like before we determine what axes pair is this and 
				let axisEleL = document.getElementById('button_'+(b+l_stick));   // get the correct id of a button to move
				if (current_style == 'XBOX') {
					if (b === ((j)/2)|0 ) {                                          // if axis id is odd, then we are dealing with Y axis
						axisEleL.style.left = ((gp.axes[j]*1000)/100|0)+'px';
					} else {                                                         // if it's even - with X axis
						axisEleL.style.top = ((gp.axes[j]*1000)/100|0)+'px';
					};		
				} else {
					if (b === ((j)/2)|0 ) {                                          // if axis id is odd, then we are dealing with Y axis
						axisEleL.style.left = ((gp.axes[j]*1000)/100|0)+6+'px';
					} else {                                                         // if it's even - with X axis
						axisEleL.style.top = ((gp.axes[j]*1000)/100|0)+6+'px';
					};		
				}	   
			}
		}	
	}
	requestAnimationFrame(onFrame); // at the end of a cycle we call onFrame once again
}

function onLoad() {	 // this function gets called in an event listener and potentially may perform something else, but meh
	requestAnimationFrame(onFrame); // it just calls onFrame for the first time
}

window.addEventListener('load', onLoad);// and the last (but not least): we need to actually tell our page to execute onLoad whrn the page is ready