var Grid = function (inputGrid)
{	
    this.grid = inputGrid.grid;
	this.gridName = inputGrid.gridName;
	this.smartGrid = {};
	
	for(var i = 1; i < this.grid.length; i++) { 
			for(var j = 1; j < this.grid[i].length; j++) { 
			    this.smartGrid[this.grid[i][0] + this.grid[0][j]] = this.grid[i][j];
			}
	}

	this.GetValue = function (key) {
		return this.smartGrid[key] != null ? this.smartGrid[key] : ""; 
	};
	
	this.GetValues = function (keyString){
		var keys = keyString.split(",");
		var result = "";
		
		for(var i = 0; i < keys.length; i++) {
			result += this.GetValue(keys[i]);
		}

		return result;
	};
	
	this.GetGridHTML = function(){
		var table = $('<table></table');
		var row = $('<tr></tr');
		
		for(var i = 0; i < this.grid[0].length; i++)
			$('<th></th>').text(this.grid[0][i]).appendTo(row);
		
		row.appendTo(table);
		
		for(var i = 1; i < this.grid.length; i++) { 
			var subRow = $('<tr></tr');
			
			for(var j = 0; j < this.grid[i].length; j++) { 
				$('<td></td>').text(this.grid[i][j]).appendTo(subRow);
			}
			
			subRow.appendTo(table);
		}
		
		return table.wrap('<p></p>').parent().html();
	};
};

var GridCollection = function (inputGrids) {
	this.grids = [];
	
	for(var i = 0; i < inputGrids.length; i++){
		var grid = new Grid(inputGrids[i]);
		this.grids.push(grid);
	}
	
	this.GetGrid = function (index) {
		if( index < 0 || index >= grids.length ){
			throw new Error("Invalid Index");
		}
		return this.grids[index];
	};
	
	this.GetGridLinksHTML = function() {
		var ul = $("<ul></ul>");
		for(var i = 0; i < this.grids.length; i++){
			 var li = $("<li></li>");
			 var label = $("<label></label>").text(this.grids[i].gridName);
			 var radio = $("<input></input>").attr({ name : "gridLinks", type : "radio", value : i});
			 
			 label.prepend(radio);
			 li.append(label);
			 ul.append(li);
		}
		return ul.wrap('<p></p>').parent().html();
	}
};
