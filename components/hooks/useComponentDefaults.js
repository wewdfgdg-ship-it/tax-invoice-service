import { useMemo } from 'react';
import { DEFAULT_PROPS } from '../constants/componentProps';

/**
 * 컴포넌트별 기본값을 자동으로 적용하는 훅
 * @param {string} componentName - 컴포넌트 이름
 * @param {Object} props - 전달받은 props
 * @returns {Object} 기본값이 적용된 props
 */
export const useComponentDefaults = (componentName, props) => {
  return useMemo(() => {
    const defaults = DEFAULT_PROPS[componentName.toLowerCase()] || {};
    return { ...defaults, ...props };
  }, [componentName, props]);
};

/**
 * 여러 컴포넌트의 기본값을 한 번에 관리하는 훅
 * @param {Object} componentProps - 컴포넌트별 props 객체
 * @returns {Object} 기본값이 적용된 컴포넌트별 props
 */
export const useMultipleDefaults = (componentProps) => {
  return useMemo(() => {
    const result = {};
    
    Object.entries(componentProps).forEach(([componentName, props]) => {
      const defaults = DEFAULT_PROPS[componentName.toLowerCase()] || {};
      result[componentName] = { ...defaults, ...props };
    });
    
    return result;
  }, [componentProps]);
};

/**
 * 조건부 props 적용 훅
 * @param {Object} baseProps - 기본 props
 * @param {Object} conditions - 조건별 props
 * @returns {Object} 조건에 따라 적용된 props
 */
export const useConditionalProps = (baseProps, conditions) => {
  return useMemo(() => {
    const conditionalProps = Object.entries(conditions)
      .filter(([, condition]) => condition.when)
      .reduce((acc, [, condition]) => ({ ...acc, ...condition.props }), {});
    
    return { ...baseProps, ...conditionalProps };
  }, [baseProps, conditions]);
};

export default useComponentDefaults;