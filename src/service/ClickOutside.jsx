import React, { Component, useEffect } from "react";

function ClickOutsideH({ children, onClick }) {
  const refs = React.Children.map(children, () => React.createRef());
  const handleClick = e => {
    const isOutside = refs.every(ref => {
      return !ref.current.contains(e.target);
    });
    if (isOutside) {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return function() {
      document.removeEventListener("click", handleClick);
    };
  });

  return React.Children.map(children, (element, idx) =>
    React.cloneElement(element, { ref: refs[idx] })
  );
}

class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.childrenRefs = React.Children.map(this.props.children, () =>
      React.createRef()
    );
  }

  handleClick = e => {
    const isOutside = this.childrenRefs.every(
      ref => !ref.current.contains(e.target)
    );
    if (isOutside) {
      console.log("outside");
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick);
  }

  render() {
    return React.Children.map(this.props.children, (element, idx) => {
      return React.cloneElement(element, { ref: this.childrenRefs[idx] });
    });
  }
}

export default ClickOutsideH;
