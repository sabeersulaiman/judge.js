/**
 * Created by ss on 17/12/16.
 */

function judgeVerify(form, errorClass) {
    var formElements = $('.' + form);
    var errors = 0;

    if(errorClass == undefined) errorClass = 'judge-error';

    formElements.each(function ( index ) {
        var type = $( this ).data('judge-type');
        var required = $( this ).data('judge-required') == 'yes';
        var value = $( this ).val().trim();

        if(required) {
            console.log(value);
            if( value == '') {
                markElement( this, errorClass );
                errors ++;
            }
            else {
                var valid = false;
                switch (type) {
                    case 'string':
                        valid = validString(value);
                        if( ! valid ) {
                            markElement( this, errorClass );
                            errors ++;
                        }
                        break;
                    case 'integer':
                        valid = validInteger(value);
                        if( ! valid ) {
                            markElement( this, errorClass );
                            errors ++;
                        }
                        break;
                    case 'float':
                        valid = validFloat(value);
                        if( ! valid ) {
                            markElement( this, errorClass );
                            errors ++;
                        }
                        break;
                    case 'file':
                        valid = validFile(this);
                        if( ! valid ) {
                            markElement( this, errorClass );
                            errors ++;
                        }
                        break;
                    default:
                        valid = true;
                        console.log('Invalid data type : ' + type);
                        break;
                }

                if(valid) removeMarking(this, errorClass);
            }
        }
    });

    if(errors == 0) return true;
    else return false;
}

function validInteger(value) {
    return ! isNaN(parseInt(value));
}

function validFloat(value) {
    return ! isNaN(parseFloat(value));
}

function validString(value) {
    if(value != '') return true;
}

function validFile(object) {
    valid = true;
    if($(object).val() == ''){
        valid =  false;
    }
    return valid;
}

function markElement( object, errorClass ) {
    $(object).addClass(errorClass);
}

function removeMarking( object, errorClass) {
    $(object).removeClass(errorClass);
}