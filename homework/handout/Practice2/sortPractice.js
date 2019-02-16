'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
  quickSort(input,0,input.length -1 );
}
function quickSort(input , first , last){
    let i,j,x;
	i=first;
	j=last;
	if(first>=last) return;
	x=input[parseInt((first+last)/2)];
	do
		{
			while(input[i]<x)
			i++;
			while(input[j]>x)
			j--;
			if(i<=j)
				{
					let temp ;
                    temp=input[i];
                    input[i]=input[j];
                    input[j]=temp;
					i++;
					j--;
				}	
		}
	while(i<=j);
	quickSort(input,first,j);
	quickSort(input,i,last);
	return;
}
module.exports = sort
