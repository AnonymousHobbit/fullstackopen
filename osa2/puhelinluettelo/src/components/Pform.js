import React from 'react'

class Pform extends React.Component {
  render() {
        return (
            <form onSubmit={ this.props.onSubmit }>
                <div>
                    Nimi: <input name="newName" onChange={ this.props.onChange } />
                </div>
                <div>
                    Numero: <input name="newNumber" onChange={ this.props.onChange } />
                </div>
                <div>
                    <button type="submit">Lisää</button>
                </div>
            </form>
        )
    }
}

export default Pform
