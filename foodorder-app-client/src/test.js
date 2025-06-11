function updateMEX(num, arr) {
	// num = 4;
	// arr = [0,1,1,4];
	let frequency = {};

	
	console.log ("num arr=", num, arr);
	arr.sort ( (a,b) => a<b);
	console.log ("sorted arr=", arr);

  for (let i=0; i<num; i++) {
    frequency[i] = 0;
  }
	for (let i=0; i<num; i++) {
    console.log (i, arr[i], frequency[arr[i]]);
		if (frequency[arr[i]] && frequency[arr[i]] != 0 )
      frequency[arr[i]] = frequency[arr[i]] + 1;
    else
      frequency [arr[i]] = 1;
    console.log (frequency[arr[i]]);
	}
		console.log ("frequency=", frequency);
		for (let i=0; i<num; i) {
			if (frequency[i] === 0) {
				mex = i;
				break;
			}
		}

		if (mex === 0)
			return -1;
		else {
			let out = num;
			for (let i=0; i<num; i++) {
				out = Math.min (out, frequency[arr[i]]);
			}
			return out;

    }

}

updateMEX (4, [0,1,1,4]);