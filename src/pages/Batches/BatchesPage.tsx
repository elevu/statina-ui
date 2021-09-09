import React from 'react';
import { setAnalyses as setAnalysesAction } from '../../domain/settings/slice';
import { RootState } from '../../domain/rootReducer';
import { connect } from 'react-redux';

const mapDispatch = {
  setAnalyses: setAnalysesAction,
} as const;
const mapState = ({ settings }: RootState) => ({ settings } as const);

export const AnalysesComponent = () => {
  return <div>Batches coming soon</div>;
};

export const BatchesPage = React.memo(
  connect(mapState, mapDispatch)(AnalysesComponent)
);
