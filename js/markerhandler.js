var A = ["H", "Li", "Na", "K"];
var B = ["F", "Cl", "Br", "I"];

var C = ["O", "S", "Se"];

var elementsArray = [];

AFRAME.registerComponent("markerhandler", {
  init: async function () {
    var compounds = await this.getCompounds();
    
    //handle marker events 
    this.el.addEventListener("markerFound", () => {



      // Changing Compound Visiblity
     


      // Changing Atom Visiblity
      
      
    });


    this.el.addEventListener("markerLost", () => {
      var elementName = this.el.getAttribute("element_name");
      var index = elementsArray.findIndex(x => x.element_name === elementName);
      if (index > -1) {
        elementsArray.splice(index, 1);
      }
    });
  },


  tick: function () {
    if (elementsArray.length > 1) {

     


      if (length === 2) {
        


        if (distance < 1.25) {
          if (compound !== undefined) {
            this.showCompound(compound);
          } else {
            messageText.setAttribute("visible", true);
          }
        } else {
          messageText.setAttribute("visible", false);
        }
      }

      if (length === 3) {
       





        if (distance1 < 1.25 && distance2 < 1.25) {

          if (compound !== undefined) {
            var barcodeValue = elementsArray[0].barcode_value;
            this.showCompound(compound, barcodeValue);
          } else {
            messageText.setAttribute("visible", true);
          }
        }
        else {
          messageText.setAttribute("visible", false);
        }
      }
    }
  },
  //Calculate distance between two position markers
  getDistance: function (elA, elB) {
   

  },

  countOccurrences: function (arr, val) {
    return arr.reduce((a, v) => (v.element_name === val ? a + 1 : a), 0);
  },

  getCompound: function () {
    for (var el of elementsArray) {
      if (A.includes(el.element_name)) {
        var compound = el.element_name;
        for (var i of elementsArray) {
          if (B.includes(i.element_name)) {
            compound += i.element_name;
            return { name: compound, value: el.barcode_value };
          }

          if (C.includes(i.element_name)) {
            var count = this.countOccurrences(elementsArray, el.element_name);
            if (count > 1) {
              compound += count + i.element_name;
              return { name: compound, value: i.barcode_value };
            }
          }
        }
      }
    }
  },
  
  showCompound: function (compound) {
    //Hide elements
    elementsArray.map(item => {
      var el = document.querySelector(`#${item.element_name}-${item.barcode_value}`);
      el.setAttribute("visible", false);
    });
    //Show Compound
    var compound = document.querySelector(`#${compound.name}-${compound.value}`);
    compound.setAttribute("visible", true);
  },

  getCompounds: function () {
    // NOTE: Use ngrok server to get json values
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);
  },
});
