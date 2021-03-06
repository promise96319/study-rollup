import { AstContext } from '../../Module';
import Identifier from '../nodes/Identifier';
import { ExpressionEntity } from '../nodes/shared/Expression';
import LocalVariable from '../variables/LocalVariable';
import BlockScope from './BlockScope';

export default class TrackingScope extends BlockScope {
	hoistedDeclarations: Identifier[] = [];

	addDeclaration(
		identifier: Identifier,
		context: AstContext,
		init: ExpressionEntity | null,
		isHoisted: boolean
	): LocalVariable {
		this.hoistedDeclarations.push(identifier);
		return super.addDeclaration(identifier, context, init, isHoisted);
	}
}
