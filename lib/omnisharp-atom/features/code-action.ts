import Omni = require('../../omni-sharp-server/omni')
import OmniSharpAtom = require('../omnisharp-atom')
import SpacePen = require('atom-space-pen-views');
import CodeActionsView = require('../views/code-actions-view');

class CodeCheck {

    view : SpacePen.SelectListView;

    constructor(private atomSharper: typeof OmniSharpAtom) {
        this.atomSharper = atomSharper;
    }
    public activate() {
        OmniSharpAtom.addCommand("omnisharp-atom:get-code-actions", () => {
            Omni.client.getcodeactionsPromise(Omni.makeRequest());
        });

        Omni.registerConfiguration(client => {
            client.observeGetcodeactions.subscribe((data) => {

                //pop ui to user.
                this.view = new CodeActionsView(data);

                //todo - cleanup / dispose.

            })
        });
    }
}
export = CodeCheck;
