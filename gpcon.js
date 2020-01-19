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
		let buttdiv = document.getElementById('buttons')  // so, we get our container element (see index.html) and add 'buttons' to it
		for (j = 0; j < gp.buttons.length; j++) {         // we cycle through all detected buttons and add those to a 'buttons' array
            if (typeof buttons[j] === "undefined") {     // if jth button isn't added yet, we will do just that
			    if (j>15) {continue;}                    // just be sure to skip weird non-existing buttons on your gamepad (PS3 Dualshock here)
				if (j==l_stick || j==r_stick) continue;  // we also need to skip sticks to add those later (if your gamepad doesn't have 'pressable' sticks - comment this line)

                let buttEle = document.createElement('span'); // create a new element (a button)
			    buttEle.classList.add('button');              // set it's class to 'button', so css can kick in
				buttEle.classList.add('button_'+j)			  // set additional class to allow customization via css
				buttEle.setAttribute("id",'button_'+j)		  // set new button's ID so we can get it later and change it's style
				buttdiv.appendChild(buttEle);                 // add newly created button to the 'container'
				
				// now to add SVG-generated graphics to some non-round-shaped buttons
				if (j==9) {// start					
					buttEle.innerHTML = '<svg id="button_9_border"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="0,0 30,9 1,18 0,0"></polygon></svg>';
				}
				if (j==12) {//up					
					buttEle.innerHTML = '<svg id="button_12" height="25" width="25" transform="rotate(0)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
				}
				if (j==13) {//down					
					buttEle.innerHTML = '<svg id="button_13" height="25" width="25" transform="rotate(180)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
				}
				if (j==14) {//left					
					buttEle.innerHTML = '<svg id="button_14" height="25" width="25" transform="rotate(270)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
				}
				if (j==15) {//right					
					buttEle.innerHTML = '<svg id="button_15" height="25" width="25" transform="rotate(90)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
				}				
				buttons[j] = true; // remember that jth button has been added
			   
             } else {                                               // this part kick in when jth button has been added already
				let buttEle = document.getElementById('button_'+j); // we get correnponding element in our HTML document
				let val = gp.buttons[j].value;                      // val keeps the value browser got from jth button (can be 0, 1 or smth in-between for analogue buttons)
			    if (gp.buttons[j].pressed) { // if current button is pressed we can alter it's style
					if (j==9) { // the 'start' button (as well as any other non-round-shaped button) has to have it's innerHTML rewritten
						buttEle.innerHTML = '<svg id="button_9_border"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(250,250,250,0.5)" points="0,0 30,9 1,18 1,0"></polygon></svg>';
					} else { // sure, this could've been coded better, but what the heck, it works
						if (j<=11) { // buttons with id lower that 12 are usually the round-shaped ones; on-stick buttons go here as well					    
							buttEle.style.background='linear-gradient(to top, rgba(255,255,255,0.5) '+val*100+'%, rgba(170,70,70,0.5) '+val*100+'%)';// gradient really helps to visualize partial presses
						}					  
						if (j>=12) {// up
							buttEle.innerHTML = '<svg id="button_12" height="25" width="25" transform="rotate(0)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(250,250,250,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
						}
						if (j==13) {// down
							buttEle.innerHTML = '<svg id="button_13" height="25" width="25" transform="rotate(180)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(250,250,250,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
						}
						if (j==14) {// left
							buttEle.innerHTML = '<svg id="button_14" height="25" width="25" transform="rotate(270)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(250,250,250,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
						}
						if (j==15) {// right
							buttEle.innerHTML = '<svg id="button_15" height="25" width="25" transform="rotate(90)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(250,250,250,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
						}
					}
				} else {  // if current button is *not* pressed we should revert it's style
					if (j==9) {// once again, the 'start' button needs special attention
						buttEle.innerHTML = '<svg id="button_9_border"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="0,0 30,9 1,18 1,0"></polygon></svg>';
					} else {
						if (j<=11) { // round-shaped buttons can be processed similarly
							buttEle.style.background='rgba(70,70,70,0.5)';
						}
						if (j==12) { // and of cource directional buttons: up
							buttEle.innerHTML = '<svg id="button_12" height="25" width="25" transform="rotate(0)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
						}
						if (j==13) {// down
							buttEle.innerHTML = '<svg id="button_13" height="25" width="25" transform="rotate(180)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
						}
						if (j==14) {// left
							buttEle.innerHTML = '<svg id="button_14" height="25" width="25" transform="rotate(270)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
						}
						if (j==15) {// right
							buttEle.innerHTML = '<svg id="button_15" height="25" width="25" transform="rotate(90)"><polygon fill-rule="evenodd" stroke="rgba(50,50,50,0.5)" fill="rgba(70,70,70,0.5)" points="1,3 3,1 22,1 24,3 24,15 14,24 12,24 1,15"></polygon></svg>';
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
				if (b === ((j)/2)|0 ) {                                          // if axis id is odd, then we are dealing with Y axis
					axisEleL.style.left = ((gp.axes[j]*1000)/100|0)+6+'px';
				} else {                                                         // if it's even - with X axis
					axisEleL.style.top = ((gp.axes[j]*1000)/100|0)+6+'px';
				};			   
			}
		}	
	}
	requestAnimationFrame(onFrame); // at the end of a cycle we call onFrame once again
}

function onLoad() {	 // this function gets called in an event listener and potentially may perform something else, but meh
	requestAnimationFrame(onFrame); // it just calls onFrame for the first time
}

window.addEventListener('load', onLoad);// and the last (but not least): we need to actually tell our page to execute onLoad whrn the page is ready