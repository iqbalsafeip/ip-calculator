class App extends Core {
	static elm;
	constructor(props) {
		super();
		this.elm = props;
	}

	renderIP = (el, biner) => {
		biner.map((e, i) => {
			el[i].innerHTML = e;
		});
	};

	renderSubmask = () => {
		const { CIRD_EL, SUBMASK_EL } = this.elm;
		SUBMASK_EL.forEach((item, index) => {
			let idx;
			if (CIRD_EL.value >= 24) idx = 3;
			else if (CIRD_EL.value >= 16) idx = 2;
			else if (CIRD_EL.value >= 8) idx = 1;
			if (index == idx) item.innerHTML = this.getSubmask(CIRD_EL.value);
			else if (index > idx) item.innerHTML = '0';
			else item.innerHTML = '255';
		});
	};

	ClearIP = (el) => {
		el.forEach((e) => {
			e.value = '';
			e.innerHTML = '-';
		});
	};

	Clear = () => {
		const { elm } = this;
		elm.CIRD_EL.value = '';
		this.ClearIP(elm.IP_EL);
		this.ClearIP(elm.NETMASKBIN_EL);
		this.ClearIP(elm.NETID_EL);
		this.ClearIP(elm.BCID_EL);
		this.ClearIP(elm.MAXRG_EL);
		this.ClearIP(elm.MINRG_EL);
		this.ClearIP(elm.SUBMASK_EL);
		elm.IPTYPE_EL.innerHTML = '-';
		elm.CLASS_EL.innerHTML = '-';
		elm.JMLSUBNET_EL.innerHTML = '-';
		elm.JMLHOST_EL.innerHTML = '-';
		elm.BLCKSUBNET_EL.innerHTML = '-';
		elm.BLCKSUBNETLIST_EL.innerHTML = '-';
	};

	isNone = () => {
		const { CIRD_EL, IP_EL } = this.elm;
		return (
			CIRD_EL.value >= 8 &&
			CIRD_EL.value <= 31 &&
			IP_EL[0].value &&
			IP_EL[1].value &&
			IP_EL[2].value &&
			IP_EL[3].value
		);
	};

	Calculate = () => {
		const { elm } = this;
		if (this.isNone()) {
			// submask render
			this.renderSubmask();
			//render subnet
			elm.JMLSUBNET_EL.innerHTML = this.getJmlSubnet(elm.CIRD_EL.value);
			this.renderIP(elm.NETMASKBIN_EL, this.getBiner(elm.CIRD_EL.value));
			// init array
			const netmaskArr = this.nodeToArray(elm.SUBMASK_EL);
			const addresArr = this.nodeToArray(elm.IP_EL);
			const revNetmask = this.getDecReversedNetmask(elm.NETMASKBIN_EL);
			const netIdArr = this.getNetId(addresArr, netmaskArr);
			const broadcastArr = this.getBroadcastId(addresArr, revNetmask);
			const maxIdArr = this.getRangeIP(broadcastArr, netIdArr).Max;
			const minIdArr = this.getRangeIP(broadcastArr, netIdArr).Min;
			const kelas = this.getKelasIP(addresArr);
			const JenisIp = this.getJenisIP(addresArr, kelas);

			//render network ID
			this.renderIP(elm.NETID_EL, netIdArr);
			// render Broad Cast Id
			this.renderIP(elm.BCID_EL, broadcastArr);
			// render Range Ip
			this.renderIP(elm.MINRG_EL, minIdArr);
			this.renderIP(elm.MAXRG_EL, maxIdArr);
			//render lainnya
			elm.IPTYPE_EL.innerHTML = JenisIp;
			elm.CLASS_EL.innerHTML = kelas;
			elm.JMLHOST_EL.innerHTML = this.getJmlHost(elm.CIRD_EL.value);
			elm.BLCKSUBNET_EL.innerHTML = this.getBlockSubnet(this.getSubmask(elm.CIRD_EL.value));
			elm.BLCKSUBNETLIST_EL.innerHTML = this.getBlockInfo(parseInt(elm.BLCKSUBNET_EL.innerHTML));
		}
	};
}
