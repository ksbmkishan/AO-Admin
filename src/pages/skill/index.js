import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditSvg, DeleteSvg } from "../../assets/svg/index.js";
import MainDatatable from "../../components/common/MainDatatable.jsx";
import * as SkillActions from "../../redux/actions/skillAction";

const Skill = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { skillData } = useSelector(state => state?.skillReducer);

    //* DataTable Columns
    const columns = [
        { name: 'S.No.', selector: row => skillData.indexOf(row) + 1 },
        { name: 'Title', selector: row => row?.skill },
        // { name: 'Image', cell: row => <img src={row?.image ? img_url + row?.image : logo} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
        {
            name: 'Action',
            cell: row => <div style={{ display: "flex", gap: "20px", alignItems: "center" }} >
                <div onClick={() => navigate('/skill/edit-skill', { state: { stateData: row } })} style={{ cursor: "pointer" }}><EditSvg /></div>
                <div onClick={() => dispatch(SkillActions.deleteSkill({ skill: row?.skill, skillId: row?._id }))} style={{ cursor: "pointer" }}><DeleteSvg /></div>
            </div >,
            width: "180px"
        },
    ];

    useEffect(() => {
        //! Dispatching API for Getting Skill
        dispatch(SkillActions.getSkill())
    }, []);

    return (
        <>
            <MainDatatable data={skillData} columns={columns} title={'Skill'} url={'/skill/add-skill'} />

        </ >
    );
}

export default Skill;