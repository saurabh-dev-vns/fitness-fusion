import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered if the 3D scene throws (e.g. WebGL unavailable). */
  fallback?: ReactNode;
}

export class SceneErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
