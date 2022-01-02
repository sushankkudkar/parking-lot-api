import {vwUser} from '../../models/vw_user'
import {vwJobList} from '../../models/vw_job_list'
import {trJobHead} from '../../models/tr_job_head'
import {trJobDetail} from '../../models/tr_job_detail'
import {pool} from '../../utils'

const getEngineers = mst_service_location_id => vwUser.findAll({
	where: {
		mst_service_location_id,
		role_name: 'Engineer',
		is_active: true
	}
})

const getJob = id => vwJobList.findOne({where: {id},
	raw: true})

const getEngineer = id => vwUser.findOne({where: {id},
	raw: true})

const addJobDetail = (jobDetail, transaction) => trJobDetail.create(jobDetail, {transaction}).catch(err => {
	throw err
})

const updateJobStatus = (job_id, mst_action_status_id, transaction) => trJobHead.update({mst_action_status_id}, {where: {id: job_id},
	transaction}).catch(err => {
	throw err
})

const fetchMyAssignedJobs = (user_id, action_status_id) => {
	const query = `select
			jh.*
		from
			SR_DEV.vw_job_list jh
		join SR_DEV.tr_job_detail jd on
			jh.id = jd.tr_job_head_id
			and jh.mst_action_status_id = ${action_status_id}
			and jd.assigned_to = ${user_id}`
	return pool.query(query)
}

const isValidJob = (job_id, user_id) => trJobDetail.findOne({where: {tr_job_head_id: job_id,
	assigned_to: user_id},
raw: true})

export {
	getEngineers,
	getJob,
	getEngineer,
	addJobDetail,
	updateJobStatus,
	fetchMyAssignedJobs,
	isValidJob
}