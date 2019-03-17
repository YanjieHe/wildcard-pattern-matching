import React from 'react'

class WildcardPatternMatching extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            pattern: '',
            result: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        if (WildcardPatternMatching.matches(this.state.text, this.state.pattern)) {
            this.setState({result: "match"})
        } else {
            this.setState({result: "no match"})
        }
        event.preventDefault();
    }

    static createArray(nrows, ncols) {
        var result = new Array(nrows);
        for (var i = 0; i < nrows; i++) {
            result[i] = new Array(ncols)
        }
        return result
    }

    static matches(text, pattern) {
        if (pattern.length === 0) {
            return text.length === 0;
        } else {
            let lookup = WildcardPatternMatching.createArray(text.length + 1, pattern.length + 1);
            for (let i = 0; i < text.length + 1; i++) {
                for (let j = 0; j < pattern.length + 1; j++) {
                    lookup[i][j] = false;
                }
            }
            lookup[0][0] = true;
            for (let j = 1; j <= pattern.length; j++) {
                if (pattern.charAt(j - 1) === '*') {
                    lookup[0][j] = lookup[0][j - 1];
                }
            }
            for (let i = 1; i <= text.length; i++) {
                for (let j = 1; j <= pattern.length; j++) {
                    if (pattern.charAt(j - 1) === '*') {
                        lookup[i][j] = lookup[i][j - 1] || lookup[i - 1][j];
                    } else if (pattern.charAt(j - 1) === '?' || text.charAt(i - 1) === pattern.charAt(j - 1)) {
                        lookup[i][j] = lookup[i - 1][j - 1];
                    } else {
                        lookup[i][j] = false;
                    }
                }
            }
            return lookup[text.length][pattern.length];
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Wildcard Pattern Matching</legend>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                Text:
                            </td>
                            <td><input type="text" name="text" value={this.state.text} onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Pattern:
                            </td>
                            <td><input type="text" name="pattern" value={this.state.pattern}
                                       onChange={this.handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="submit" value="TEST MATCH"/></td>
                            <td>Result: <span style={{"color": "red"}}>{this.state.result}</span></td>
                        </tr>
                        </tbody>
                    </table>
                </fieldset>
            </form>
        );
    }
}

export default WildcardPatternMatching