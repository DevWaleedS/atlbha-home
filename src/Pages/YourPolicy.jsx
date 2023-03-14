import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PolicyBox } from '../components';
import { YourPolicyThunk } from '../RTK/Thunk/YourPolicyThunk';

const YourPolicy = () => {
  let param = useParams()
  let dispatch = useDispatch()
  let navigate = useNavigate();

  let { policyName, policyTitle, policyDescription, policyLoadingData } = useSelector((state) => state.YourPolicyReducer)
  useEffect(() => {
    if (!isNaN(param.policyID)) {
      dispatch(YourPolicyThunk({ id: param.policyID }))

    }
    else {
      navigate('/')
    }
  }, [param.policyID]);
  return (
    <>
      <PolicyBox
        Loading={policyLoadingData}
        Name={policyName}
        Title={policyTitle}
        Description={policyDescription}
      />
    </>
  );
}

export default YourPolicy;
