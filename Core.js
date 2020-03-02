class Core {
	getNewBiner = (biner) => {
		let Biner = [];
		biner.forEach(({ innerHTML }) => Biner.push(innerHTML));
		return Biner.join('');
	};

	dec2bin = (dec) => {
		return (dec >>> 0).toString(2);
	};

	bin2dec = (bin) => {
		return parseInt(bin, 2).toString(10);
	};

	nodeToArray = (Node) => {
		let Temp = [];
		Node.forEach((e) => {
			Temp.push(e.innerHTML || e.value);
		});
		return Temp;
	};

	getJenisIP = (ip, kelas) => {
		const ipPrivateRange = [
			{
				kelas: 'A',
				min: [ 10, 0, 0, 0 ],
				max: [ 10, 255, 255, 254 ]
			},
			{
				kelas: 'B',
				min: [ 172, 16, 0, 0 ],
				max: [ 172, 31, 255, 254 ]
			},
			{
				kelas: 'C',
				min: [ 192, 168, 0, 0 ],
				max: [ 192, 168, 255, 254 ]
			}
		];

		let result = ipPrivateRange.filter((e) => e.kelas === kelas)[0];
		let res = 0;
		ip.map((e, i) => {
			if (e >= result.min[i] && e <= result.max[i]) {
				res += 1;
			}
		});
		return res === 4 ? 'Private' : 'Public';
	};

	getNetId = (address, netmask) => {
		let netid = [];
		address.map((e, i) => {
			netid.push(netmask[i] & e);
		});
		return netid;
	};

	getBroadcastId = (address, decRevNetmask) => {
		let broadcast = [];
		address.map((e, i) => {
			broadcast.push(decRevNetmask[i] | e);
		});
		return broadcast;
	};

	getRangeIP = (broadcast, network) => {
		const self = {};
		self.Max = [ ...broadcast ];
		self.Max[3] -= 1;
		self.Min = [ ...network ];
		self.Min[3] += 1;
		return self;
	};

	getDecReversedNetmask = (biner) => {
		let reverseNetmask = '';

		let Biner = this.getNewBiner(biner);
		for (let i = 0; i < Biner.length; i++) {
			if (Biner[i] === '1') {
				reverseNetmask += '0';
			} else {
				reverseNetmask += '1';
			}
		}
		let Temp = '';
		let decRevNetmask = [];
		for (let i = 0; i < Biner.length; i++) {
			Temp += reverseNetmask[i];
			if (i === 7 || i === 15 || i === 23 || i === 31) {
				decRevNetmask.push(this.bin2dec(Temp));
				Temp = '';
			}
		}
		return decRevNetmask;
	};
	getKelasIP = (ip) => {
		if (ip[0] >= 1 && ip[0] <= 127) {
			return 'A';
		} else if (ip[0] >= 128 && ip[0] <= 191) {
			return 'B';
		} else if (ip[0] >= 192 && ip[0] <= 223) {
			return 'C';
		}
	};

	getJmlSubnet = (crid) => {
		if (crid >= 24) return Math.pow(2, crid - 24);
		else if (crid >= 16) return Math.pow(2, crid - 16);
		else if (crid >= 8) return Math.pow(2, crid - 8);
	};

	getSubmask = (crid) => {
		let biner = [ 128, 64, 32, 16, 8, 4, 2 ];
		let _subMask = 0;
		let _crid;
		if (crid >= 24) _crid = 24;
		else if (crid >= 16) _crid = 16;
		else _crid = 8;
		for (let i = 0; i < crid - _crid; i++) _subMask += biner[i];
		return _subMask;
	};

	getJmlHost = (cidr) => Math.pow(2, 32 - cidr) - 2;

	getBlockSubnet = (hostid) => 256 - hostid;

	getBlockInfo = (blockSubnet) => {
		let _subnet = '';
		let _blkSubnet = blockSubnet;
		while (blockSubnet < 256) {
			blockSubnet == _blkSubnet ? (_subnet += `  ${blockSubnet} `) : (_subnet += ` , ${blockSubnet} `);
			blockSubnet += _blkSubnet;
		}

		return ` 0 - ${_blkSubnet - 1}, ${_subnet}`;
	};

	getBiner = (cird) => {
		let newBiner = [];
		let biner = '';
		let block = 8;
		for (let i = 1; i <= 40; i++) {
			if (i <= block) {
				i <= cird ? (biner += '1') : (biner += '0');
			} else {
				i--;
				newBiner.push(biner);
				biner = '';
				block += 8;
			}
		}
		return newBiner;
	};
}
