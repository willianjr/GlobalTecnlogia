import React,{useEffect, useState} from "react"
import aws from '../main/services/aws'

import ContentHeader from "../common/components/layout/contentHeader"
import Content from "../common/components/layout/content"
import Loading from '../common/components/loading'
import Row from "../common/components/layout/row"
import Grid from "../common/components/layout/grid"
import Card from "../common/components/layout/card"

import Graficos from '../common/components/graficos'

interface StateProps{
	loading:boolean
}
interface DispatchProps{
	userGetId(id:number):void
	userSave(data:object):void
}
interface OwnProps{
	history:any,

}
type Props = OwnProps & StateProps & DispatchProps

export default function Dashboard (props:Props) {

	const [loading,setLoading] = useState(true)
	const [clusterStatus,setClusterStatus] = useState('')
	const [cpuUsage,setCpuUsage] = useState([])
	const [cpuUsageLabels,setCpuUsageLabels] = useState([])
	const [memoryUsage,setMemoryUsage] = useState([])
	const [memoryUsageLabels,setMemoryUsageLabels] = useState([])

	const getCpuUsageData = () => {
		aws.post("b1bc5162-7cf2-4599-b1f5-e3bd58fcf07f")
			.then((response) => {
					const {data,labels} = response.data
					setCpuUsage(data)
					setCpuUsageLabels(labels)
					//console.log(response.data)
			})
			.catch((error) => {
				console.log(error)

			});
	}
	const getMemoryUsageData = () =>{
		aws.post("d23c3262-967e-4567-b7f6-2fd263748811")
			.then((response) => {
				const {data,labels} = response.data
				setMemoryUsage(data)
				setMemoryUsageLabels(labels)
				//console.log(response.data)
			})
			.catch((error) => {
				console.log(error)

			});
	}
	const getClusterStatusInfo = () =>{
		aws.post("cab2791c-7c85-4461-b95c-86bc1a12dc72")
			.then((response) => {
					//console.log("getClusterStatusInfo",response.data);
					const {status} = response.data
					setClusterStatus(status)

			})
			.catch((error) => {
				console.log(error)

			});
	}

	useEffect(() => {
		setLoading(true)
		Promise.all([getMemoryUsageData(), getClusterStatusInfo(), getCpuUsageData()]).then(() => {
			setLoading(false);
		});
	}, [])

	return (
    <div>
			<Loading msg="Carregando" loading={loading} icon="refresh"/>
			<Content>
						<Row>
							<Grid cols='12 6 4' >
								<Card header="CPU Usage" headerIcon="cog">
									<Graficos.Bar  labels={cpuUsageLabels} data={cpuUsage} />
								</Card>
							</Grid>
							<Grid cols='12 6 4' >
								<Card header="Memory Usage" headerIcon="microchip">
									<Graficos.Bar  labels={memoryUsageLabels} data={memoryUsage} />
								</Card>
							</Grid>
							<Grid cols='12 6 4'>
								<Card header="Cluster Status" headerIcon="tachometer">
									 <div className={`StatusCluster ${clusterStatus}`}>
											<i className={`fa fa-${clusterStatus==='green'?'check-circle-o':'exclamation-circle'}`} aria-hidden="true"></i>
										</div>
								</Card>
							</Grid>
						</Row>


			</Content>

    </div>
  )

}
